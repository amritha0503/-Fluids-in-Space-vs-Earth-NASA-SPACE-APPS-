import React, { useEffect, useRef } from 'react';
import './FluidCanvas.css';

const FluidCanvas = ({ parameters }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Initialize particles based on fluid type
    const initParticles = () => {
      particlesRef.current = [];
      const numParticles = parameters.fluidType === 'colloid' ? 80 : 50;
      
      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: width / 2 + (Math.random() - 0.5) * parameters.containerSize,
          y: height / 2 + (Math.random() - 0.5) * parameters.containerSize,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: parameters.fluidType === 'colloid' ? 3 : 5,
          mass: 1,
        });
      }
    };

    initParticles();

    // Get fluid color based on type
    const getFluidColor = () => {
      switch (parameters.fluidType) {
        case 'water':
          return 'rgba(0, 191, 255, 0.8)';
        case 'oil':
          return 'rgba(255, 165, 0, 0.8)';
        case 'colloid':
          return 'rgba(139, 92, 246, 0.8)';
        default:
          return 'rgba(0, 191, 255, 0.8)';
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Draw container
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        width / 2 - parameters.containerSize / 2,
        height / 2 - parameters.containerSize / 2,
        parameters.containerSize,
        parameters.containerSize
      );

      const particles = particlesRef.current;
      const containerLeft = width / 2 - parameters.containerSize / 2;
      const containerRight = width / 2 + parameters.containerSize / 2;
      const containerTop = height / 2 - parameters.containerSize / 2;
      const containerBottom = height / 2 + parameters.containerSize / 2;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply gravity
        particle.vy += parameters.gravity * 0.01;

        // Temperature effect (increases random motion)
        const tempFactor = parameters.temperature / 50;
        particle.vx += (Math.random() - 0.5) * tempFactor * 0.1;
        particle.vy += (Math.random() - 0.5) * tempFactor * 0.1;

        // Viscosity dampening
        particle.vx *= (1 - parameters.viscosity * 0.02);
        particle.vy *= (1 - parameters.viscosity * 0.02);

        // Surface tension effect (in microgravity)
        if (parameters.gravity < 1) {
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 10) {
            const surfaceTensionForce = 0.05 * (1 - parameters.gravity);
            particle.vx += (dx / distance) * surfaceTensionForce;
            particle.vy += (dy / distance) * surfaceTensionForce;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Container collision
        if (particle.x - particle.radius < containerLeft) {
          particle.x = containerLeft + particle.radius;
          particle.vx *= -0.8;
        }
        if (particle.x + particle.radius > containerRight) {
          particle.x = containerRight - particle.radius;
          particle.vx *= -0.8;
        }
        if (particle.y - particle.radius < containerTop) {
          particle.y = containerTop + particle.radius;
          particle.vy *= -0.8;
        }
        if (particle.y + particle.radius > containerBottom) {
          particle.y = containerBottom - particle.radius;
          particle.vy *= -0.8;
        }

        // Particle-particle interaction (colloid self-assembly in microgravity)
        if (parameters.gravity < 1 && parameters.fluidType === 'colloid') {
          particles.forEach((other, j) => {
            if (i !== j) {
              const dx = other.x - particle.x;
              const dy = other.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 20 && distance > 0) {
                const force = 0.02;
                particle.vx -= (dx / distance) * force;
                particle.vy -= (dy / distance) * force;
              }
            }
          });
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = getFluidColor();
        ctx.fill();

        // Add glow effect in microgravity
        if (parameters.gravity < 1) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = getFluidColor();
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw connections between nearby particles (colloid structure)
      if (parameters.fluidType === 'colloid' && parameters.gravity < 1) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.lineWidth = 1;
        
        particles.forEach((particle, i) => {
          particles.forEach((other, j) => {
            if (i < j) {
              const dx = other.x - particle.x;
              const dy = other.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 25) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
              }
            }
          });
        });
      }

      // Add labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Gravity: ${parameters.gravity.toFixed(1)} m/s²`, 20, 30);
      ctx.fillText(`Temperature: ${parameters.temperature}°C`, 20, 50);
      
      if (parameters.gravity < 0.5) {
        ctx.fillStyle = 'rgba(0, 191, 255, 0.8)';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('MICROGRAVITY MODE', 20, height - 20);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  return (
    <div className="fluid-canvas-container">
      <canvas ref={canvasRef} className="fluid-canvas" />
    </div>
  );
};

export default FluidCanvas;
