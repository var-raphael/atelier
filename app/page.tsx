'use client';

import { useState } from 'react';
import RingModel from './components/RingModel';
import ColorSelector from './components/ColorSelector';
import { bandColors, diamondColors } from '@/lib/colors';

export default function Home() {
  const [selectedBand, setSelectedBand] = useState('Gold');
  const [selectedDiamond, setSelectedDiamond] = useState('Clear');

  const bandHex = bandColors.find(c => c.name === selectedBand)?.hex || 0xFFD700;
  const diamondHex = diamondColors.find(c => c.name === selectedDiamond)?.hex || 0xFFFFFF;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080706;
          color: #e8e0d0;
          font-family: 'DM Mono', monospace;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -2%); }
          20% { transform: translate(2%, 1%); }
          30% { transform: translate(-2%, 2%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(2%, -2%); }
          70% { transform: translate(-2%, 1%); }
          80% { transform: translate(1%, 2%); }
          90% { transform: translate(-1%, -1%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .grain-overlay {
          pointer-events: none;
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grain 0.8s steps(1) infinite;
          z-index: 9999;
        }

        .fade-up-1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .fade-up-3 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .fade-up-4 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }

        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #b8922a 0%,
            #e8c96a 30%,
            #f5e09a 50%,
            #e8c96a 70%,
            #b8922a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .page-layout {
          min-height: 100vh;
          display: grid;
          grid-template-rows: auto 1fr auto;
          position: relative;
        }

        /* Ambient light blobs */
        .ambient {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ambient-gold {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%);
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(40px);
        }
        .ambient-cool {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%);
          bottom: 15%;
          right: 10%;
          filter: blur(60px);
        }

        /* Header */
        .site-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 48px;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .site-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232,224,208,0.5);
          text-decoration: none;
        }
        .site-logo span {
          color: #c9a84c;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.6);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 6px 14px;
          border-radius: 99px;
        }
        .header-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c9a84c;
          opacity: 0.7;
        }

        /* Main content */
        .content-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 64px 24px 80px;
          gap: 0;
        }

        /* Title block */
        .title-block {
          text-align: center;
          margin-bottom: 52px;
        }
        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.55);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .eyebrow-line {
          display: block;
          width: 32px;
          height: 1px;
          background: rgba(201,168,76,0.3);
        }
        .main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 76px);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: rgba(232,224,208,0.92);
          margin-bottom: 16px;
        }
        .main-title em {
          font-style: italic;
        }
        .subtitle {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(232,224,208,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }
        .subtitle-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(201,168,76,0.35);
          display: inline-block;
        }

        /* Viewer shell */
        .viewer-shell {
          width: 100%;
          max-width: 860px;
          background: rgba(255,255,255,0.018);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.4),
            0 40px 120px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(201,168,76,0.08);
          margin-bottom: 40px;
          position: relative;
        }
        .viewer-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(201,168,76,0.07);
          background: rgba(0,0,0,0.2);
        }
        .viewer-dots {
          display: flex;
          gap: 6px;
        }
        .viewer-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .viewer-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.4);
        }
        .viewer-tag {
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.35);
          border: 1px solid rgba(201,168,76,0.12);
          padding: 3px 10px;
          border-radius: 4px;
        }
        .viewer-canvas-wrap {
          padding: 0;
          background: radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 65%), #0c0b09;
        }

        /* Color selectors layout */
        .selectors-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 860px;
        }

        .selector-card {
          flex: 1;
          min-width: 240px;
          max-width: 420px;
          background: rgba(255,255,255,0.018);
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 16px;
          padding: 22px 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,168,76,0.06);
        }
        .selector-label {
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .selector-label::before {
          content: '';
          display: block;
          width: 16px;
          height: 1px;
          background: rgba(201,168,76,0.3);
        }
        .selected-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          color: rgba(232,224,208,0.7);
          margin-bottom: 14px;
          letter-spacing: 0.04em;
        }

        /* Footer */
        .site-footer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-text {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(232,224,208,0.15);
        }
        .footer-hint {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .site-header { padding: 20px 24px; }
          .site-footer { padding: 18px 24px; }
          .viewer-shell { border-radius: 16px; }
          .title-block { margin-bottom: 36px; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ambient light */}
      <div className="ambient">
        <div className="ambient-gold" />
        <div className="ambient-cool" />
      </div>

      <div className="page-layout">

        {/* Header */}
        <header className="site-header fade-up-1">
          <a href="/" className="site-logo">
            Atelier<span>.</span>3D
          </a>
          <div className="header-badge">
            <span className="header-badge-dot" />
            Interactive Viewer
          </div>
        </header>

        {/* Main */}
        <main className="content-wrap">

          {/* Title */}
          <div className="title-block fade-up-2">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Bespoke Collection
              <span className="eyebrow-line" />
            </div>
            <h1 className="main-title">
              Craft Your <em className="gold-shimmer">Ring</em>
            </h1>
            <p className="subtitle">
              <span>Drag to rotate</span>
              <span className="subtitle-sep" />
              <span>Scroll to zoom</span>
              <span className="subtitle-sep" />
              <span>Real-time preview</span>
            </p>
          </div>

          {/* 3D Viewer */}
          <div className="viewer-shell fade-up-3">
            <div className="viewer-top-bar">
              <div className="viewer-dots">
                <div className="viewer-dot" style={{ background: '#ff5f57' }} />
                <div className="viewer-dot" style={{ background: '#febc2e' }} />
                <div className="viewer-dot" style={{ background: '#28c840' }} />
              </div>
              <span className="viewer-label">3D Render — WebGL</span>
              <span className="viewer-tag">Live</span>
            </div>
            <div className="viewer-canvas-wrap">
              <RingModel
                bandColor={bandHex}
                diamondColor={diamondHex}
              />
            </div>
          </div>

          {/* Color selectors */}
          <div className="selectors-row fade-up-4">
            <div className="selector-card">
              <div className="selector-label">Ring Band</div>
              <div className="selected-name">{selectedBand}</div>
              <ColorSelector
                colors={bandColors}
                activeColor={selectedBand}
                onColorChange={setSelectedBand}
                label=""
              />
            </div>

            <div className="selector-card">
              <div className="selector-label">Diamond</div>
              <div className="selected-name">{selectedDiamond}</div>
              <ColorSelector
                colors={diamondColors}
                activeColor={selectedDiamond}
                onColorChange={setSelectedDiamond}
                label=""
              />
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="site-footer">
          <span className="footer-text">© 2026 Atelier.3D — All rights reserved</span>
          <span className="footer-hint">
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,168,76,0.4)', display: 'inline-block' }} />
            Powered by Three.js & WebGL
          </span>
        </footer>

      </div>
    </>
  );
}
