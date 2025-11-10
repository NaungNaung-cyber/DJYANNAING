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
      ctx.fillStyle = '#02010e';
      ctx.fillRect(0, 0, width, height);

      const { x: cx, y: cy } = center();
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
      gradient.addColorStop(0, 'rgba(88, 28, 135, 0.55)');
      gradient.addColorStop(0.35, 'rgba(17, 24, 39, 0.4)');
      gradient.addColorStop(0.75, 'rgba(2, 1, 14, 0.9)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

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

        ctx.strokeStyle = `rgba(212, 180, 255, ${0.07 + Math.abs(scrollMomentum) * 1.5})`;
        ctx.lineWidth = 2;
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

        const alpha = 0.2 + particle.depth * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x, y, 1.2 + particle.depth, 1.2 + particle.depth);
      });
    };

    const drawVinyl = () => {
      const { x: cx, y: cy } = center();
      const radius = Math.min(width, height) * vinyl.radiusFactor;

      vinyl.baseRotation += 0.0015 + Math.abs(scrollMomentum) * vinyl.spinMultiplier;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(vinyl.baseRotation + galaxyRotation * 0.4);

      const discGradient = ctx.createRadialGradient(-radius * 0.2, -radius * 0.2, radius * 0.1, 0, 0, radius);
      discGradient.addColorStop(0, '#2e1065');
      discGradient.addColorStop(0.35, '#111827');
      discGradient.addColorStop(0.75, '#020617');
      discGradient.addColorStop(1, '#000000');

      ctx.beginPath();
      ctx.fillStyle = discGradient;
      ctx.shadowColor = 'rgba(96, 165, 250, 0.15)';
      ctx.shadowBlur = 24;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      for (let i = 0; i < vinyl.grooveCount; i++) {
        const grooveRadius = (radius * 0.7) * (1 - i / vinyl.grooveCount * 0.9);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.025 + (i / vinyl.grooveCount) * 0.08})`;
        ctx.arc(0, 0, grooveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const labelRadius = radius * vinyl.labelRadiusFactor;
      const labelGradient = ctx.createRadialGradient(-labelRadius * 0.3, -labelRadius * 0.3, labelRadius * 0.2, 0, 0, labelRadius);
      labelGradient.addColorStop(0, '#f97316');
      labelGradient.addColorStop(1, '#be185d');

      ctx.beginPath();
      ctx.fillStyle = labelGradient;
      ctx.arc(0, 0, labelRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#0f172a';
      ctx.arc(0, 0, labelRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#e2e8f0';
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
