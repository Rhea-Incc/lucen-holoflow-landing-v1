const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/*
  Image optimization edge function.
  
  Usage: GET /optimize-image?src=<path>&w=<width>&q=<quality>&f=<format>
  
  - src: path in the media bucket (e.g. "real-estate-hologram.jpg")
  - w: target width (optional, default: original)
  - q: quality 1-100 (optional, default: 80)
  - f: format - "webp", "avif", "jpeg", "png" (optional, auto-detect from Accept header)
  
  Uses Supabase Storage image transformation API.
*/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const src = url.searchParams.get('src')
    
    if (!src) {
      return new Response(JSON.stringify({ error: 'Missing src parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const width = url.searchParams.get('w')
    const quality = url.searchParams.get('q') || '80'
    let format = url.searchParams.get('f')

    // Auto-detect best format from Accept header
    if (!format) {
      const accept = req.headers.get('accept') || ''
      if (accept.includes('image/avif')) {
        format = 'avif'
      } else if (accept.includes('image/webp')) {
        format = 'webp'
      } else {
        format = 'jpeg'
      }
    }

    // Build Supabase Storage render URL with transforms
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const transformParams: string[] = []
    
    if (width) transformParams.push(`width=${width}`)
    transformParams.push(`quality=${quality}`)
    transformParams.push(`format=${format}`)

    const renderUrl = `${supabaseUrl}/storage/v1/render/image/public/media/${src}?${transformParams.join('&')}`

    // Forward conditional headers so the upstream can answer 304
    const upstreamHeaders: HeadersInit = {}
    const ifNoneMatch = req.headers.get('if-none-match')
    const ifModifiedSince = req.headers.get('if-modified-since')
    if (ifNoneMatch) upstreamHeaders['If-None-Match'] = ifNoneMatch
    if (ifModifiedSince) upstreamHeaders['If-Modified-Since'] = ifModifiedSince

    const imageResponse = await fetch(renderUrl, { headers: upstreamHeaders })

    if (imageResponse.status === 304) {
      return new Response(null, {
        status: 304,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'ETag': imageResponse.headers.get('etag') ?? '',
          'Last-Modified': imageResponse.headers.get('last-modified') ?? '',
          'Vary': 'Accept',
        },
      })
    }
    
    if (!imageResponse.ok) {
      // Fallback: serve original file directly
      const originalUrl = `${supabaseUrl}/storage/v1/object/public/media/${src}`
      const fallbackResponse = await fetch(originalUrl)
      
      if (!fallbackResponse.ok) {
        return new Response(JSON.stringify({ error: 'Image not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const body = fallbackResponse.body
      const contentType = fallbackResponse.headers.get('content-type') || 'application/octet-stream'
      
      return new Response(body, {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'CDN-Cache-Control': 'public, max-age=31536000',
        },
      })
    }

    const body = imageResponse.body
    const contentType = imageResponse.headers.get('content-type') || `image/${format}`
    const etag = imageResponse.headers.get('etag')
    const lastModified = imageResponse.headers.get('last-modified')

    const headers: Record<string, string> = {
      ...corsHeaders,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'CDN-Cache-Control': 'public, max-age=31536000',
      'Vary': 'Accept',
    }
    if (etag) headers['ETag'] = etag
    if (lastModified) headers['Last-Modified'] = lastModified

    return new Response(body, { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
