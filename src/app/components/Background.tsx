'use client';

import { useEffect, useState } from 'react';
import { BackgroundSettings, DEFAULT_BACKGROUNDS } from '../types/background';
import Image from 'next/image';

interface BackgroundProps {
  settings: BackgroundSettings;
}

export default function Background({ settings }: BackgroundProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (settings.type === 'preset' && settings.currentPreset === 'shuffle') {
      const interval = setInterval(() => {
        setNextBgIndex((currentBgIndex + 1) % (DEFAULT_BACKGROUNDS.length - 1) + 1);
        setIsLoading(true);
      }, 25000);

      return () => clearInterval(interval);
    }
  }, [settings.type, settings.currentPreset, currentBgIndex]);

  const handleImageLoad = () => {
    setCurrentBgIndex(nextBgIndex);
    setIsLoading(false);
  };

  const getBackgroundContent = () => {
    switch (settings.type) {
      case 'preset': {
        if (settings.currentPreset === 'shuffle') {
          const currentBg = DEFAULT_BACKGROUNDS[currentBgIndex];
          const nextBg = DEFAULT_BACKGROUNDS[nextBgIndex];
          return (
            <>
              <Image
                src={currentBg.url}
                alt={currentBg.name}
                fill
                className={`object-cover transition-opacity duration-[2s] ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ filter: `blur(${settings.blurLevel}px)` }}
                priority
              />
              {isLoading && (
                <Image
                  src={nextBg.url}
                  alt={nextBg.name}
                  fill
                  className="object-cover transition-opacity opacity-0 duration-[2s]"
                  style={{ filter: `blur(${settings.blurLevel}px)` }}
                  onLoadingComplete={(image) => {
                    image.classList.remove("opacity-0");
                    handleImageLoad();
                  }}
                  priority
                />
              )}
            </>
          );
        }
        const preset = DEFAULT_BACKGROUNDS.find(bg => bg.id === settings.currentPreset) || DEFAULT_BACKGROUNDS[0];
        return (
          <Image
            src={preset.url}
            alt={preset.name}
            fill
            className="object-cover transition-opacity duration-[2s]"
            style={{ filter: `blur(${settings.blurLevel}px)`, opacity: settings.opacity }}
            priority
          />
        );
      }
      case 'custom':
        return settings.customImage ? (
          <Image
            src={settings.customImage}
            alt="Custom background"
            fill
            className="object-cover transition-opacity duration-[2s]"
            style={{ filter: `blur(${settings.blurLevel}px)`, opacity: settings.opacity }}
          />
        ) : null;
      case 'gradient':
        return (
          <div
            className="absolute inset-0 transition-opacity duration-[2s]"
            style={{
              background: `linear-gradient(${settings.gradient?.angle}deg, ${settings.gradient?.colors.join(', ')})`,
              opacity: settings.opacity,
              filter: `blur(${settings.blurLevel}px)`
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {getBackgroundContent()}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
} 