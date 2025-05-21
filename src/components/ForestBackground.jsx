import { useEffect, useRef, useState } from "react";

export const ForestBackground = () => {
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      const newIsDarkMode = document.documentElement.classList.contains("dark");
      if (!newIsDarkMode && isDarkMode) {
        // Only set transitioning when switching to light mode
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300); // Match transition duration
      }
      setIsDarkMode(newIsDarkMode);
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the canvas context
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    setCanvasSize();

    // Draw a detailed tree
    const drawTree = (x, y, scale = 1, sway = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.rotate(sway * 0.02); // Sway effect

      // Draw trunk with gradient
      const trunkGradient = ctx.createLinearGradient(0, 0, 0, -120);
      trunkGradient.addColorStop(0, "#3D2817");
      trunkGradient.addColorStop(1, "#5D3A1F");
      ctx.fillStyle = trunkGradient;

      // Main trunk
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.quadraticCurveTo(-10, -60, -5, -120);
      ctx.lineTo(5, -120);
      ctx.quadraticCurveTo(10, -60, 8, 0);
      ctx.closePath();
      ctx.fill();

      // Draw foliage with multiple layers
      const foliageColors = ["#1B4D3E", "#2D6A4F", "#40916C"];

      // Bottom layer
      ctx.fillStyle = foliageColors[0];
      ctx.beginPath();
      ctx.moveTo(-60, -80);
      ctx.quadraticCurveTo(0, -140, 60, -80);
      ctx.quadraticCurveTo(0, -60, -60, -80);
      ctx.fill();

      // Middle layer
      ctx.fillStyle = foliageColors[1];
      ctx.beginPath();
      ctx.moveTo(-50, -100);
      ctx.quadraticCurveTo(0, -160, 50, -100);
      ctx.quadraticCurveTo(0, -80, -50, -100);
      ctx.fill();

      // Top layer
      ctx.fillStyle = foliageColors[2];
      ctx.beginPath();
      ctx.moveTo(-40, -120);
      ctx.quadraticCurveTo(0, -180, 40, -120);
      ctx.quadraticCurveTo(0, -100, -40, -120);
      ctx.fill();

      ctx.restore();
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw multiple trees with animation
    const trees = [
      { x: canvas.width * 0.15, y: canvas.height, scale: 1.2, sway: 0 },
      { x: canvas.width * 0.35, y: canvas.height, scale: 0.9, sway: 0 },
      { x: canvas.width * 0.65, y: canvas.height, scale: 1.1, sway: 0 },
      { x: canvas.width * 0.85, y: canvas.height, scale: 0.8, sway: 0 },
      { x: canvas.width * 0.25, y: canvas.height, scale: 1.0, sway: 0 },
      { x: canvas.width * 0.75, y: canvas.height, scale: 0.95, sway: 0 },
    ];

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update tree positions
      trees.forEach((tree) => {
        tree.sway = Math.sin(Date.now() * 0.001 + tree.x) * 0.5;
        drawTree(tree.x, tree.y, tree.scale, tree.sway);
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
  }, []);

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
        zIndex: 1,
        opacity: isDarkMode ? 0 : 0.8,
        transition: isTransitioning ? "opacity 0.3s ease-in-out" : "none",
      }}
    />
  );
};
