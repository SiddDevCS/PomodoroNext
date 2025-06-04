export interface BackgroundSettings {
  type: 'preset' | 'custom' | 'gradient';
  currentPreset?: string;
  customImage?: string;
  opacity: number;
  blurLevel: number;
  gradient?: {
    colors: string[];
    angle: number;
  };
}

export interface PresetBackground {
  id: string;
  url: string;
  name: string;
}

export const DEFAULT_BACKGROUNDS: PresetBackground[] = [
  {
    id: 'shuffle',
    url: '/backgrounds/mountains.jpg',
    name: '🔄 Shuffle'
  },
  {
    id: 'mountains',
    url: '/backgrounds/mountains.jpg',
    name: 'Mountains'
  },
  {
    id: 'forest',
    url: '/backgrounds/forest.jpg',
    name: 'Forest'
  },
  {
    id: 'ocean',
    url: '/backgrounds/ocean.jpg',
    name: 'Ocean'
  },
  {
    id: 'desert',
    url: '/backgrounds/desert.jpg',
    name: 'Desert'
  },
  {
    id: 'night-sky',
    url: '/backgrounds/night-sky.jpg',
    name: 'Night Sky'
  },
  {
    id: 'waterfall',
    url: '/backgrounds/waterfall.jpg',
    name: 'Waterfall'
  },
  {
    id: 'autumn-path',
    url: '/backgrounds/autumn-path.jpg',
    name: 'Autumn Path'
  },
  {
    id: 'lake-sunset',
    url: '/backgrounds/lake-sunset.jpg',
    name: 'Lake Sunset'
  },
  {
    id: 'cherry-blossoms',
    url: '/backgrounds/cherry-blossoms.jpg',
    name: 'Cherry Blossoms'
  },
  {
    id: 'northern-lights',
    url: '/backgrounds/northern-lights.jpg',
    name: 'Northern Lights'
  },
  {
    id: 'tropical-beach',
    url: '/backgrounds/tropical-beach.jpg',
    name: 'Tropical Beach'
  }
];

export const DEFAULT_GRADIENTS = [
  {
    name: 'Sunset',
    colors: ['#ff7e5f', '#feb47b'],
    angle: 45
  },
  {
    name: 'Ocean',
    colors: ['#2193b0', '#6dd5ed'],
    angle: 45
  },
  {
    name: 'Forest',
    colors: ['#134e5e', '#71b280'],
    angle: 45
  },
  {
    name: 'Purple Haze',
    colors: ['#7303c0', '#ec38bc'],
    angle: 45
  },
  {
    name: 'Deep Space',
    colors: ['#000000', '#434343'],
    angle: 45
  },
  {
    name: 'Aurora',
    colors: ['#4facfe', '#00f2fe'],
    angle: 45
  }
]; 