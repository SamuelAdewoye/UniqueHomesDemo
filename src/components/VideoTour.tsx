/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

export default function VideoTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    };
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video-tour" className="py-20 bg-white border-b border-brand-border/40">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold">
            A Closer Look
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">
            Walk Through Our Latest Developments
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-[#6B6B7B] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Spaces with room for the life you are building. Step inside the kind of homes, finishes, and neighbourhoods Unique Homes is proud to represent.
          </p>
        </div>

        {/* Custom Video Player Container */}
        <div className="relative aspect-video rounded-[28px] overflow-hidden shadow-2xl bg-[#1A1A2E] group border border-brand-border">
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
            loop
            muted={isMuted}
            playsInline
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-swimming-pool-and-palm-trees-4414-large.mp4"
            poster="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
          />

          {/* Thumbnail / Play Overlay */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/45"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-brand-gold shadow-2xl transition-all duration-300 hover:scale-105 group-hover:bg-brand-gold group-hover:text-white">
                <Play size={28} fill="currentColor" className="ml-1" />
              </div>
              <span className="mt-4 text-[#F5F5F0] text-xs font-semibold tracking-widest uppercase">
                Begin Guided Tour
              </span>
            </div>
          )}

          {/* Controls Bar */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Progress Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />

            {/* Buttons Row */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="hover:text-brand-gold transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>

                {/* Restart */}
                <button
                  onClick={handleRestart}
                  className="hover:text-brand-gold transition-colors cursor-pointer"
                  title="Restart Video"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Sound */}
                <button
                  onClick={toggleMute}
                  className="hover:text-brand-gold transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Specs Badge Overlay during play */}
              <div className="hidden sm:block text-xs font-mono text-white/80">
                Unique Homes & Properties — Maitama Development Walkthrough
              </div>

              <div className="flex items-center gap-4">
                {/* Full Screen */}
                <button
                  onClick={handleFullScreen}
                  className="hover:text-brand-gold transition-colors cursor-pointer"
                  title="Full Screen"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Bottom Subtext */}
        <p className="text-center text-xs text-[#9A9AA8] mt-6 font-mono uppercase tracking-wider">
          Completed Maitama Duplex Walkthrough — Handover Ceremony
        </p>
      </div>
    </section>
  );
}
