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

      const discGradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
      discGradient.addColorStop(0, '#020103');
      discGradient.addColorStop(0.45, '#08040d');
      discGradient.addColorStop(1, '#141021');

      ctx.beginPath();
      ctx.fillStyle = discGradient;
      ctx.shadowColor = 'rgba(0, 0, 0, 0)';
      ctx.shadowBlur = 0;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      for (let i = 0; i < vinyl.grooveCount; i++) {
        const progress = i / vinyl.grooveCount;
        const grooveRadius = radius * (0.98 - progress * 0.9);
        const radialFade = Math.sin(progress * Math.PI);
        const baseAlpha = 0.12 + radialFade * 0.32;
        const accent = i % 5 === 0;
        const edgeFade = Math.pow(Math.max(1 - progress, 0), accent ? 1.2 : 1.6);
        const alpha = Math.min((accent ? baseAlpha * 1.05 : baseAlpha) * edgeFade, 0.32);
        ctx.lineWidth = 0.4 + radialFade * (accent ? 0.85 : 0.45);
        ctx.beginPath();
        ctx.strokeStyle = accent
          ? `rgba(140, 120, 200, ${alpha})`
          : `rgba(228, 226, 248, ${alpha})`;
        ctx.arc(0, 0, grooveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const labelRadius = radius * vinyl.labelRadiusFactor;
      const labelGradient = ctx.createLinearGradient(-labelRadius, -labelRadius, labelRadius, labelRadius);
      labelGradient.addColorStop(0, '#22113f');
      labelGradient.addColorStop(0.5, '#ac94f2');
      labelGradient.addColorStop(1, '#2a174f');

      ctx.beginPath();
      ctx.fillStyle = labelGradient;
      ctx.arc(0, 0, labelRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#0a0316';
      ctx.arc(0, 0, labelRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#e6e4ff';
      ctx.arc(0, 0, labelRadius * 0.08, 0, Math.PI * 2);
      ctx.fill();

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
