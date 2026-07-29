import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shape: number;
}

export function FlowerPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color palette: Maroon, Crimson, Champagne Gold, Soft Rose
    const colors = [
      "#800000",
      "#a81c1c",
      "#d4af37",
      "#e8b4b8",
      "#f5e6d3",
      "#6b0000",
    ];

    const petalCount = Math.min(Math.floor(width / 25), 45); // Responsive petal count
    const petals: Petal[] = [];

    const createPetal = (): Petal => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.floor(Math.random() * 3),
    });

    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal());
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      if (p.shape === 0) {
        // Organic Rose Petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, -p.size, 0, 0);
      } else if (p.shape === 1) {
        // Tear Petal
        ctx.arc(0, 0, p.size / 2, 0, Math.PI);
        ctx.bezierCurveTo(-p.size / 2, -p.size, 0, -p.size * 1.2, 0, -p.size * 1.2);
        ctx.bezierCurveTo(0, -p.size * 1.2, p.size / 2, -p.size, p.size / 2, 0);
      } else {
        // Oval Petal
        ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.005) + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset if off screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}
