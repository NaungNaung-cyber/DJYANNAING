import React, { useEffect, useRef } from 'react';

interface Planet {
  radius: number; // relative orbital radius (0 - 0.5)
  size: number; // pixels
  colorStops: [number, string][];
  glow: string;
  angle: number;
  speed: number;
  eccentricity: number;
  spin: number;
}

interface CosmicDust {
  angle: number;
  distance: number;
  depth: number;
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

    const planets: Planet[] = [
      {
        radius: 0.18,
        size: 22,
        colorStops: [
          [0, '#fff7ad'],
          [0.45, '#f6ad55'],
          [1, '#d97706'],
        ],
        glow: 'rgba(250, 214, 137, 0.45)',
        angle: Math.random() * Math.PI * 2,
        speed: 0.00065,
        eccentricity: 0.7,
        spin: 0.8,
      },
      {
        radius: 0.28,
        size: 30,
        colorStops: [
          [0, '#e0f2fe'],
          [0.6, '#38bdf8'],
          [1, '#0ea5e9'],
        ],
        glow: 'rgba(14, 165, 233, 0.4)',
        angle: Math.random() * Math.PI * 2,
        speed: 0.00045,
        eccentricity: 0.55,
        spin: -0.5,
      },
      {
        radius: 0.38,
        size: 38,
        colorStops: [
          [0, '#f5f3ff'],
          [0.5, '#a855f7'],
          [1, '#7c3aed'],
        ],
        glow: 'rgba(124, 58, 237, 0.35)',
        angle: Math.random() * Math.PI * 2,
        speed: 0.00035,
        eccentricity: 0.65,
        spin: 1.2,
      },
    ];

    const dust: CosmicDust[] = Array.from({ length: 180 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * maxRadius(),
      depth: Math.random() * 0.8 + 0.2,
    }));

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

    const drawPlanets = () => {
      const { x: cx, y: cy } = center();
      const baseOrbit = Math.min(width, height) * 0.5;

      planets.forEach((planet) => {
        planet.angle += (planet.speed + Math.abs(scrollMomentum) * 0.0025) * (16 + planet.radius * 20);

        const orbitRadius = baseOrbit * planet.radius;
        const x = cx + Math.cos(planet.angle) * orbitRadius;
        const y = cy + Math.sin(planet.angle) * orbitRadius * planet.eccentricity;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(galaxyRotation * planet.spin);

        const gradient = ctx.createRadialGradient(-planet.size * 0.4, -planet.size * 0.4, planet.size * 0.2, 0, 0, planet.size);
        planet.colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color));

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.shadowColor = planet.glow;
        ctx.shadowBlur = 18;
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.abs(scrollMomentum) * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      });
    };

    const animate = (timestamp: number) => {
      drawBackground();
      drawGalaxyArms(timestamp * 0.001);
      drawDust();
      drawPlanets();

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
