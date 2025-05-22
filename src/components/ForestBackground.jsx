import { useEffect, useRef, useState } from "react";

export const ForestBackground = () => {
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isVisible, setIsVisible] = useState(false);

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

  // Listen for the last animation element to complete
  useEffect(() => {
    const handleLastAnimationComplete = () => {
      // Delay tree appearance slightly after the "View My Work" button appears
      setTimeout(() => {
        setIsVisible(true);
      }, 200); // Small additional delay after the last hero element
    };

    // Wait for the animation of the "View My Work" button to complete
    const animationDelay = 800; // Matches the delay-4 animation (0.8s)
    const animationDuration = 700; // Matches the fade-in duration (0.7s)
    const totalDelay = animationDelay + animationDuration;
    
    const timer = setTimeout(handleLastAnimationComplete, totalDelay);
    
    return () => clearTimeout(timer);
  }, []);

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
      setWindowWidth(window.innerWidth);
    };
    setCanvasSize();

    // Draw different types of trees
    const drawTallTree = (x, y, scale = 1, sway = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.rotate(sway * 0.05); // Increased sway effect

      // Draw trunk with gradient - taller trunk
      const trunkGradient = ctx.createLinearGradient(0, 0, 0, -180);
      trunkGradient.addColorStop(0, "#3D2817");
      trunkGradient.addColorStop(1, "#5D3A1F");
      ctx.fillStyle = trunkGradient;

      // Main trunk
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.quadraticCurveTo(-12, -90, -6, -180);
      ctx.lineTo(6, -180);
      ctx.quadraticCurveTo(12, -90, 10, 0);
      ctx.closePath();
      ctx.fill();

      // Draw foliage with multiple layers
      const foliageColors = ["#1B4D3E", "#2D6A4F", "#40916C"];

      // Bottom layer
      ctx.fillStyle = foliageColors[0];
      ctx.beginPath();
      ctx.moveTo(-70, -120);
      ctx.quadraticCurveTo(0, -200, 70, -120);
      ctx.quadraticCurveTo(0, -90, -70, -120);
      ctx.fill();

      // Middle layer
      ctx.fillStyle = foliageColors[1];
      ctx.beginPath();
      ctx.moveTo(-60, -160);
      ctx.quadraticCurveTo(0, -240, 60, -160);
      ctx.quadraticCurveTo(0, -130, -60, -160);
      ctx.fill();

      // Top layer
      ctx.fillStyle = foliageColors[2];
      ctx.beginPath();
      ctx.moveTo(-50, -200);
      ctx.quadraticCurveTo(0, -280, 50, -200);
      ctx.quadraticCurveTo(0, -170, -50, -200);
      ctx.fill();

      ctx.restore();
    };

    const drawMediumTree = (x, y, scale = 1, sway = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.rotate(sway * 0.06); // Increased sway effect

      // Draw trunk with gradient
      const trunkGradient = ctx.createLinearGradient(0, 0, 0, -140);
      trunkGradient.addColorStop(0, "#4D341F");
      trunkGradient.addColorStop(1, "#6A4C2F");
      ctx.fillStyle = trunkGradient;

      // Main trunk
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.quadraticCurveTo(-10, -70, -5, -140);
      ctx.lineTo(5, -140);
      ctx.quadraticCurveTo(10, -70, 8, 0);
      ctx.closePath();
      ctx.fill();

      // Draw foliage with multiple layers
      const foliageColors = ["#2D6A4F", "#40916C", "#52B788"];

      // Bottom layer
      ctx.fillStyle = foliageColors[0];
      ctx.beginPath();
      ctx.moveTo(-60, -100);
      ctx.quadraticCurveTo(0, -170, 60, -100);
      ctx.quadraticCurveTo(0, -80, -60, -100);
      ctx.fill();

      // Middle layer
      ctx.fillStyle = foliageColors[1];
      ctx.beginPath();
      ctx.moveTo(-50, -130);
      ctx.quadraticCurveTo(0, -200, 50, -130);
      ctx.quadraticCurveTo(0, -110, -50, -130);
      ctx.fill();

      // Top layer
      ctx.fillStyle = foliageColors[2];
      ctx.beginPath();
      ctx.moveTo(-40, -160);
      ctx.quadraticCurveTo(0, -220, 40, -160);
      ctx.quadraticCurveTo(0, -140, -40, -160);
      ctx.fill();

      ctx.restore();
    };

    const drawSmallTree = (x, y, scale = 1, sway = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.rotate(sway * 0.07); // Increased sway effect

      // Draw trunk with gradient
      const trunkGradient = ctx.createLinearGradient(0, 0, 0, -100);
      trunkGradient.addColorStop(0, "#3D2817");
      trunkGradient.addColorStop(1, "#5D3A1F");
      ctx.fillStyle = trunkGradient;

      // Main trunk
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.quadraticCurveTo(-8, -50, -4, -100);
      ctx.lineTo(4, -100);
      ctx.quadraticCurveTo(8, -50, 6, 0);
      ctx.closePath();
      ctx.fill();

      // Draw foliage with multiple layers
      const foliageColors = ["#1B4D3E", "#2D6A4F", "#40916C"];

      // Bottom layer
      ctx.fillStyle = foliageColors[0];
      ctx.beginPath();
      ctx.moveTo(-45, -70);
      ctx.quadraticCurveTo(0, -120, 45, -70);
      ctx.quadraticCurveTo(0, -50, -45, -70);
      ctx.fill();

      // Middle layer
      ctx.fillStyle = foliageColors[1];
      ctx.beginPath();
      ctx.moveTo(-35, -90);
      ctx.quadraticCurveTo(0, -140, 35, -90);
      ctx.quadraticCurveTo(0, -70, -35, -90);
      ctx.fill();

      // Top layer
      ctx.fillStyle = foliageColors[2];
      ctx.beginPath();
      ctx.moveTo(-25, -110);
      ctx.quadraticCurveTo(0, -150, 25, -110);
      ctx.quadraticCurveTo(0, -90, -25, -110);
      ctx.fill();

      ctx.restore();
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate trees based on screen width
    const generateTrees = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // Determine number of trees based on screen size
      const treeCount = isMobile ? 4 : isTablet ? 6 : 8;
      
      const trees = [];
      
      // Create trees with different sizes and positions
      for (let i = 0; i < treeCount; i++) {
        // Distribute trees evenly across the width
        const xPosition = canvas.width * (i / (treeCount - 1) * 0.8 + 0.1);
        
        // Randomize tree type and scale
        const treeType = Math.floor(Math.random() * 3); // 0: small, 1: medium, 2: tall
        const baseScale = isMobile ? 0.7 : isTablet ? 0.85 : 1.0;
        const randomScale = baseScale * (0.8 + Math.random() * 0.4); // 0.8-1.2 of base scale
        
        // Add staggered animation timing for each tree
        const animationDelay = i * 100; // 100ms delay between each tree
        
        trees.push({
          x: xPosition,
          y: canvas.height,
          scale: randomScale,
          sway: 0,
          type: treeType,
          animationProgress: 0,
          animationDelay: animationDelay
        });
      }
      
      return trees;
    };

    const trees = generateTrees();

    let animationFrameId;
    let startTime = 0;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw trees if they should be visible
      if (isVisible) {
        // Update and draw trees with animation
        trees.forEach((tree) => {
          // Calculate animation progress based on elapsed time and tree's delay
          const treeAnimationTime = Math.max(0, elapsedTime - tree.animationDelay);
          const animationDuration = 700; // 700ms to match the fade-in animation
          tree.animationProgress = Math.min(1, treeAnimationTime / animationDuration);
          
          // Only draw tree if its animation has started
          if (treeAnimationTime > 0) {
            // Apply easing function for smoother animation
            const easeOutProgress = 1 - Math.pow(1 - tree.animationProgress, 3);
            
            // Calculate tree's current scale based on animation progress
            const currentScale = tree.scale * easeOutProgress;
            
            // Update sway effect
            tree.sway = Math.sin(Date.now() * 0.001 + tree.x) * 0.5;
            
            // Draw different tree types with current scale
            if (tree.type === 0) {
              drawSmallTree(tree.x, tree.y, currentScale, tree.sway);
            } else if (tree.type === 1) {
              drawMediumTree(tree.x, tree.y, currentScale, tree.sway);
            } else {
              drawTallTree(tree.x, tree.y, currentScale, tree.sway);
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation with timestamp
    requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowWidth, isVisible]);

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
        opacity: isDarkMode ? 0 : isVisible ? 0.9 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: isDarkMode 
          ? "none" 
          : isVisible 
            ? "opacity 0.7s ease-out, transform 0.7s ease-out" 
            : isTransitioning 
              ? "opacity 0.3s ease-in-out" 
              : "none",
      }}
    />
  );
};
