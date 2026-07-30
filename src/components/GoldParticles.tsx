import { useEffect, useRef } from "react";

export function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768 || ("ontouchstart" in window);
    const particleCount = isMobile ? 14 : 28;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.3 ? "rgba(212, 175, 55," : "rgba(243, 229, 171,",
      alpha: Math.random() * 0.6 + 0.3,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * 0.015 + 0.005,
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      // Limit to ~60fps
      if (currentTime - lastTime < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(currentTime * 0.002) * p.pulse;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.15, Math.min(0.75, Math.abs(p.alpha)));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 opacity-60 w-full h-full"
    />
  );
}
