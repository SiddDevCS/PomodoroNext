'use client';

import { useState, useCallback, useEffect } from 'react';
import { BackgroundSettings, PresetBackground, DEFAULT_BACKGROUNDS, DEFAULT_GRADIENTS } from '../types/background';
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import Image from 'next/image';

interface BackgroundSettingsPanelProps {
  settings: BackgroundSettings;
  onSettingsChange: (settings: BackgroundSettings) => void;
}

export default function BackgroundSettingsPanel({ settings, onSettingsChange }: BackgroundSettingsPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(settings.type);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpacityChange = useCallback((value: number[]) => {
    onSettingsChange({ ...settings, opacity: value[0] });
  }, [settings, onSettingsChange]);

  const handleBlurChange = useCallback((value: number[]) => {
    onSettingsChange({ ...settings, blurLevel: value[0] });
  }, [settings, onSettingsChange]);

  const handlePresetSelect = useCallback((preset: PresetBackground) => {
    onSettingsChange({
      ...settings,
      type: 'preset',
      currentPreset: preset.id
    });
  }, [settings, onSettingsChange]);

  const handleGradientSelect = useCallback((gradient: typeof DEFAULT_GRADIENTS[0]) => {
    onSettingsChange({
      ...settings,
      type: 'gradient',
      gradient: {
        colors: gradient.colors,
        angle: gradient.angle
      }
    });
  }, [settings, onSettingsChange]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSettingsChange({
          ...settings,
          type: 'custom',
          customImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }, [settings, onSettingsChange]);

  const OpacityAndBlurControls = () => (
    <div className="space-y-4 pt-4 border-t">
      <div className="space-y-2">
        <label className="text-sm font-medium">Background Opacity</label>
        <Slider
          value={[settings.opacity]}
          onValueChange={handleOpacityChange}
          min={0}
          max={1}
          step={0.1}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Blur Level</label>
        <Slider
          value={[settings.blurLevel]}
          onValueChange={handleBlurChange}
          min={0}
          max={20}
          step={1}
        />
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="preset">Preset Backgrounds</TabsTrigger>
            <TabsTrigger value="custom">Custom Upload</TabsTrigger>
            <TabsTrigger value="gradient">Gradients</TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="m-0 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {DEFAULT_BACKGROUNDS.map((preset) => (
                <div
                  key={preset.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                    settings.currentPreset === preset.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={preset.url}
                      alt={preset.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1.5 text-sm truncate">
                    {preset.name}
                  </div>
                </div>
              ))}
            </div>
            <OpacityAndBlurControls />
          </TabsContent>

          <TabsContent value="custom" className="m-0 space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Button asChild>
                <label>
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
              {settings.customImage && (
                <div className="relative w-full max-w-md h-40">
                  <Image
                    src={settings.customImage}
                    alt="Custom background"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <OpacityAndBlurControls />
          </TabsContent>

          <TabsContent value="gradient" className="m-0 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {DEFAULT_GRADIENTS.map((gradient, index) => (
                <div
                  key={index}
                  className="h-24 rounded-lg cursor-pointer transition-transform hover:scale-105"
                  style={{
                    background: `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`
                  }}
                  onClick={() => handleGradientSelect(gradient)}
                />
              ))}
            </div>
            <OpacityAndBlurControls />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 