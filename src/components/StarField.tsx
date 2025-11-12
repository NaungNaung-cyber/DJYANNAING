import React, { useEffect, useRef } from 'react';

interface CosmicDust {
  angle: number;
  distance: number;
  depth: number;
}

interface VinylDisc {
  radiusFactor: number;
  grooveCount: number;
  baseRotation: number;
  spinMultiplier: number;
  labelRadiusFactor: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const maxRadius = () => Math.max(width, height) * 0.6;
    const center = () => ({ x: width / 2, y: height / 2 });

    const dust: CosmicDust[] = Array.from({ length: 180 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * maxRadius(),
      depth: Math.random() * 0.8 + 0.2,
    }));

    const vinyl: VinylDisc = {
      radiusFactor: 0.42,
      grooveCount: 45,
      baseRotation: Math.random() * Math.PI * 2,
      spinMultiplier: 0.35,
      labelRadiusFactor: 0.32,
    };

    let galaxyRotation = 0;
    let scrollMomentum = 0;
    let lastScrollY = window.scrollY;
    let animationFrameId = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      scrollMomentum += delta * 0.0004;
      scrollMomentum = Math.max(Math.min(scrollMomentum, 0.06), -0.06);
      lastScrollY = currentScroll;
    };

    const drawBackground = () => {
      ctx.fillStyle = '#010103';
      ctx.fillRect(0, 0, width, height);

      const { x: cx, y: cy } = center();
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
      gradient.addColorStop(0, 'rgba(180, 160, 220, 0.08)');
      gradient.addColorStop(0.25, 'rgba(54, 34, 84, 0.2)');
      gradient.addColorStop(0.55, 'rgba(18, 10, 28, 0.9)');
      gradient.addColorStop(0.85, 'rgba(6, 4, 12, 0.98)');
      gradient.addColorStop(1, 'rgba(1, 1, 3, 1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGalaxyArms = (timeFactor: number) => {
      const { x: cx, y: cy } = center();
      const radius = maxRadius();
      const arms = 5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(galaxyRotation);

      for (let i = 0; i < arms; i++) {
        ctx.rotate((Math.PI * 2) / arms);
        ctx.beginPath();

        for (let r = 0; r <= radius; r += 8) {
          const turbulence = Math.sin((r / radius) * 6 + timeFactor * 0.8) * 28;
          const angle = (r / radius) * Math.PI * 1.6;
          const x = Math.cos(angle) * (r + turbulence);
          const y = Math.sin(angle) * (r * 0.5 + turbulence * 0.4);

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(120, 82, 200, ${0.05 + Math.abs(scrollMomentum) * 0.9})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawDust = () => {
      const { x: cx, y: cy } = center();

      dust.forEach((particle) => {
        particle.angle += (0.0006 + scrollMomentum * 0.25) * particle.depth;
        particle.distance += Math.sin(galaxyRotation + particle.angle) * 0.15;

        const orbitRadius = particle.distance;
        const x = cx + Math.cos(particle.angle) * orbitRadius;
        const y = cy + Math.sin(particle.angle) * orbitRadius * 0.55;

        const alpha = 0.22 + particle.depth * 0.45;
        const size = 1 + particle.depth * 0.9;
        ctx.fillStyle = `rgba(230, 230, 245, ${alpha})`;
        ctx.fillRect(x, y, size, size);
      });
    };

    const drawVinyl = () => {
      const { x: cx, y: cy } = center();
      const radius = Math.min(width, height) * vinyl.radiusFactor;

      vinyl.baseRotation += 0.0015 + Math.abs(scrollMomentum) * vinyl.spinMultiplier;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(vinyl.baseRotation + galaxyRotation * 0.4);

      // Base purple disc
      const baseGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      baseGradient.addColorStop(0, '#6B46C1');
      baseGradient.addColorStop(0.3, '#7C3AED');
      baseGradient.addColorStop(0.6, '#8B5CF6');
      baseGradient.addColorStop(1, '#9333EA');

      ctx.beginPath();
      ctx.fillStyle = baseGradient;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // Create marbled/swirled effect with overlapping patterns
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + vinyl.baseRotation * 0.5;
        const swirlRadius = radius * (0.3 + (i % 3) * 0.2);
        const swirlX = Math.cos(angle) * swirlRadius * 0.4;
        const swirlY = Math.sin(angle) * swirlRadius * 0.4;
        
        const swirlGradient = ctx.createRadialGradient(swirlX, swirlY, 0, swirlX, swirlY, radius * 0.6);
        const purpleShade = i % 3 === 0 ? '#A855F7' : i % 3 === 1 ? '#9333EA' : '#7C3AED';
        swirlGradient.addColorStop(0, purpleShade);
        swirlGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        swirlGradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.beginPath();
        ctx.fillStyle = swirlGradient;
        ctx.arc(swirlX, swirlY, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add white streaks for marbled effect
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + vinyl.baseRotation * 0.3;
        const streakX = Math.cos(angle) * radius * (0.2 + (i % 4) * 0.15);
        const streakY = Math.sin(angle) * radius * (0.2 + (i % 4) * 0.15);
        
        const streakGradient = ctx.createRadialGradient(streakX, streakY, 0, streakX, streakY, radius * 0.3);
        streakGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        streakGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        streakGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = streakGradient;
        ctx.arc(streakX, streakY, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      // Draw grooves
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      for (let i = 0; i < vinyl.grooveCount; i++) {
        const progress = i / vinyl.grooveCount;
        const grooveRadius = radius * (0.98 - progress * 0.9);
        const radialFade = Math.sin(progress * Math.PI);
        const baseAlpha = 0.08 + radialFade * 0.15;
        const accent = i % 5 === 0;
        const edgeFade = Math.pow(Math.max(1 - progress, 0), accent ? 1.2 : 1.6);
        const alpha = Math.min((accent ? baseAlpha * 1.05 : baseAlpha) * edgeFade, 0.2);
        ctx.lineWidth = 0.3 + radialFade * (accent ? 0.6 : 0.3);
        ctx.beginPath();
        ctx.strokeStyle = accent
          ? `rgba(100, 80, 180, ${alpha})`
          : `rgba(200, 190, 230, ${alpha})`;
        ctx.arc(0, 0, grooveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const labelRadius = radius * vinyl.labelRadiusFactor;
      
      // Yellowish label background with linear gradient - lighter in middle, stronger on edges
      const labelGradient = ctx.createLinearGradient(-labelRadius, -labelRadius, labelRadius, labelRadius);
      labelGradient.addColorStop(0, '#CD853F');
      labelGradient.addColorStop(0.5, '#FFFACD');
      labelGradient.addColorStop(1, '#CD853F');
      
      ctx.beginPath();
      ctx.fillStyle = labelGradient;
      ctx.arc(0, 0, labelRadius, 0, Math.PI * 2);
      ctx.fill();

      // Spindle hole - cut through the label and disc (like real vinyl)
      const holeRadius = labelRadius * 0.15;
      
      // Create a hole by using composite operation to cut through everything
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      
      // Add inner rim/shadow to make hole look more realistic and three-dimensional
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add subtle inner highlight
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.arc(0, 0, holeRadius * 0.95, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const animate = (timestamp: number) => {
      drawBackground();
      drawGalaxyArms(timestamp * 0.001);
      drawDust();
      drawVinyl();

      galaxyRotation += 0.0009 + scrollMomentum * 0.35;
      scrollMomentum *= 0.92;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
