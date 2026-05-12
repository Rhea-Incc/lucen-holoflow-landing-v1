export interface UseCase {
  slug: string;
  title: string;
  image: string;
  images: string[];
  videos: string[];
  description: string;
  highlights: string[];
  /** How the homepage hero image should fit. Defaults to 'cover'. Use 'contain' when the source must be shown in full. */
  imageFit?: 'cover' | 'contain';
}

export const useCases: UseCase[] = [
  {
    slug: 'retail-product-launch',
    title: 'Retail Product Launch',
    image: '/media/Innovative-Brands-and-Event-Organisers.jpg',
    images: ['/media/Innovative-Brands-and-Event-Organisers.jpg', '/media/Starbucks.jpg'],
    videos: ['/media/Comp-1_10-2.mp4', '/media/demo.mp4'],
    description: 'Transform product launches into immersive holographic events that generate buzz, drive foot traffic, and create viral social media moments.',
    highlights: ['3D holographic product reveal', 'Interactive feature exploration', 'Real-time audience analytics', 'Social media integration'],
  },
  {
    slug: 'real-estate-sales-center',
    title: 'Real Estate Sales Center',
    image: '/media/hologram-for-real-estate.jpg',
    images: ['/media/hologram-for-real-estate.jpg', '/media/real-estate-hologram.jpg', '/media/real-estate-hologram-2.jpg'],
    videos: ['/media/real-estate-vid.mp4', '/media/4.mp4'],
    description: 'Convert sales centers into immersive visualization experiences where buyers walk through unbuilt properties and explore entire developments.',
    highlights: ['3D property walkthroughs', 'Interactive floor plans', 'Neighborhood visualization', 'Buyer engagement tracking'],
    imageFit: 'contain',
  },
  {
    slug: 'automotive-showroom',
    title: 'Automotive Showroom',
    image: '/media/auto-4.png',
    images: ['/media/auto-4.png', '/media/auto-showroom_holo-3.jpg', '/media/auto-showroom_holo-2.jpg', '/media/auto-showroom-2.jpg', '/media/auto-showroom-holo.jpg'],
    videos: ['/media/demo-2.mp4', '/media/autoshowroom_vid-2.mp4'],
    description: 'Bring vehicles to life with holographic displays that showcase every angle, feature, and configuration possibility.',
    highlights: ['360° vehicle visualization', 'Feature deep-dives', 'Color and trim configurator', 'Showroom traffic analytics'],
  },
  {
    slug: 'trade-show-booth',
    title: 'Trade Show Immersive Booth',
    image: '/media/events-hologram.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/2-3.mp4', '/media/2-2.mp4', '/media/exhibitions.mp4'],
    description: 'Stand out at trade shows with holographic installations that draw crowds and create unforgettable brand impressions.',
    highlights: ['Crowd-stopping holograms', 'Interactive product demos', 'Lead capture integration', 'Event ROI analytics'],
  },
  {
    slug: 'events',
    title: 'Events & Live Productions',
    image: '/media/hospitality.jpg',
    images: ['/media/hospitality.jpg', '/media/Events-2.jpg'],
    videos: [],
    description: 'Elevate concerts, galas, festivals and live productions with show-stopping volumetric holograms that transform venues into immersive worlds.',
    highlights: ['Stage-scale volumetric visuals', 'Synchronized lighting & audio', 'Headline-act activations', 'Audience capture & analytics'],
  },
  {
    slug: 'mall-advertising-network',
    title: 'Mall Advertising Network',
    image: '/media/Starbucks.jpg',
    images: ['/media/Starbucks.jpg', '/media/Innovative-Brands-and-Event-Organisers.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Deploy holographic advertising networks across malls to monetize high footfall with premium, measurable ad placements.',
    highlights: ['DOOH holographic network', 'Programmatic ad delivery', 'Footfall measurement', 'Revenue share model'],
  },
  {
    slug: 'airport-brand-campaigns',
    title: 'Airport Brand Campaigns',
    image: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Capture the attention of high-value travelers with holographic brand activations in premium airport locations.',
    highlights: ['Lounge holographic displays', 'Gate area activations', 'Duty-free showcases', 'Traveler engagement data'],
  },
  {
    slug: 'corporate-lobby',
    title: 'Corporate Lobby Installation',
    image: '/media/corporate_lobby.jpg',
    images: ['/media/corporate_lobby.jpg'],
    videos: ['/media/corporate_lobby-2.mp4', '/media/corporate_lobby.mp4', '/media/Track-overlay_1.mp4'],
    description: 'Transform corporate lobbies into brand showcases with holographic installations that impress visitors and reinforce brand identity.',
    highlights: ['Brand storytelling holograms', 'Visitor experience design', 'Real-time content management', 'Visitor analytics'],
  },
  {
    slug: 'airline-experience',
    title: 'Airline Experience',
    image: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Elevate the airline passenger journey with holographic wayfinding, lounge experiences, and gate entertainment that create premium brand moments.',
    highlights: ['Lounge immersive experiences', 'Gate area entertainment', 'Wayfinding holograms', 'Passenger flow optimization'],
  },
];
