import React from 'react';
import Hero from '../components/Hero';
import ConverterCard from '../components/Converter/ConverterCard';
import AdBanner from '../components/AdBanner';
import HowItWorks from '../components/HowItWorks';
import SupportedFormats from '../components/SupportedFormats';
import FaqSection from '../components/FaqSection';
import SeoHead from '../components/SeoHead';

export default function HomePage({ onOpenPro }) {
  return (
    <div className="space-y-6">
      <SeoHead
        title="Free Video & YouTube to MP3 Converter (320 kbps)"
        description="Convert any video file (MP4, MOV, WebM, AVI, MKV) and YouTube URL into studio-grade 320kbps MP3 audio. Fast, ephemeral privacy, and 100% free."
        canonical="https://audivexa.com/"
      />
      {/* Hero Section */}
      <Hero />

      {/* Main Converter Card Container */}
      <div className="px-4 sm:px-6 lg:px-8">
        <ConverterCard />
      </div>

      {/* Compliant Ad / Sponsor Banner */}
      <div className="px-4 sm:px-6 lg:px-8">
        <AdBanner onOpenPro={onOpenPro} />
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* Supported Formats */}
      <SupportedFormats />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
