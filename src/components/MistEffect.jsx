import { useEffect, useRef, useState } from "react";

export const MistEffect = () => {
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    setCanvasSize();

    // Create mist particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 100 + 50,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.6 + 0.4,
    }));

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.speed;
        if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size;
        }

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        if (isDarkMode) {
          // Dark mode: white mist
          gradient.addColorStop(
            0,
            `rgba(255, 255, 255, ${particle.opacity * 0.3})`
          );
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          // Light mode: darker gray clouds
          gradient.addColorStop(
            0,
            `rgba(80, 80, 80, ${particle.opacity * 0.8})`
          );
          gradient.addColorStop(1, "rgba(80, 80, 80, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: isDarkMode ? 0 : 0.1,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};
