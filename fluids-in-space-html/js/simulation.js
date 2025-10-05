// Fluid Simulation Engine - React Match
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fluidCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let isPaused = false;
    
    // Simulation parameters matching React presets
    const params = {
        fluidType: 'water',
        gravity: 9.8,
        temperature: 25,
        viscosity: 10,
        containerSize: 300
    };
    
    // Preset configurations matching React
    const presets = {
        earth: { gravity: 9.8, temperature: 25, viscosity: 10 },
        moon: { gravity: 1.62, temperature: 20, viscosity: 10 },
        mars: { gravity: 3.71, temperature: 22, viscosity: 10 },
        iss: { gravity: 0.001, temperature: 22, viscosity: 10 }
    };
    
    // Particles
    let particles = [];
    
    // Canvas setup
    function resizeCanvas() {
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const numParticles = params.fluidType === 'colloid' ? 80 : 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: centerX + (Math.random() - 0.5) * params.containerSize * 0.8,
                y: centerY + (Math.random() - 0.5) * params.containerSize * 0.8,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: params.fluidType === 'colloid' ? 3 : 5,
                mass: 1
            });
        }
    }
    
    // Get fluid color
    function getFluidColor() {
        switch (params.fluidType) {
            case 'water': return 'rgba(0, 191, 255, 0.8)';
            case 'oil': return 'rgba(255, 165, 0, 0.8)';
            case 'colloid': return 'rgba(139, 92, 246, 0.8)';
            default: return 'rgba(0, 191, 255, 0.8)';
        }
    }
    
    // Update info panel and behavior description
    function updateInfoPanel() {
        const environmentValue = document.getElementById('environmentValue');
        const dominantForceValue = document.getElementById('dominantForceValue');
        const behaviorValue = document.getElementById('behaviorValue');
        const behaviorDescription = document.getElementById('behaviorDescription');
        
        if (!environmentValue || !behaviorDescription) return;
        
        // Update environment
        if (params.gravity < 0.5) {
            environmentValue.textContent = 'Microgravity';
            dominantForceValue.textContent = 'Surface Tension';
            behaviorValue.textContent = 'Spherical Formation';
            behaviorDescription.innerHTML = '<strong>Microgravity:</strong> Surface tension dominates! Fluid forms perfect spheres and exhibits unique behaviors like floating water bridges. This is how fluids behave on the ISS.';
        } else if (params.gravity >= 0.5 && params.gravity < 3) {
            environmentValue.textContent = 'Low Gravity';
            dominantForceValue.textContent = 'Mixed Forces';
            behaviorValue.textContent = 'Partial Settling';
            behaviorDescription.innerHTML = '<strong>Low Gravity (Moon/Mars):</strong> A fascinating mix of behaviors! Some settling occurs due to gravity, but surface tension still plays a major role in fluid shape and movement.';
        } else if (params.gravity >= 3 && params.gravity < 7) {
            environmentValue.textContent = 'Moderate Gravity';
            dominantForceValue.textContent = 'Gravity + Tension';
            behaviorValue.textContent = 'Settling with Effects';
            behaviorDescription.innerHTML = '<strong>Moderate Gravity:</strong> Gravity begins to dominate, pulling fluids downward while surface tension creates interesting edge effects and meniscus formation.';
        } else {
            environmentValue.textContent = 'Earth-like';
            dominantForceValue.textContent = 'Gravity';
            behaviorValue.textContent = 'Normal';
            behaviorDescription.innerHTML = '<strong>Earth Gravity:</strong> Fluid particles settle to the bottom due to gravity. Surface tension and viscosity work together with gravitational forces, creating the familiar behavior we see in everyday life.';
        }
    }
    
    // Animation loop
    function animate() {
        if (isPaused) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        // Clear canvas
        ctx.fillStyle = 'rgba(6, 9, 24, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw container
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            centerX - params.containerSize / 2,
            centerY - params.containerSize / 2,
            params.containerSize,
            params.containerSize
        );
        
        // Container boundaries
        const left = centerX - params.containerSize / 2;
        const right = centerX + params.containerSize / 2;
        const top = centerY - params.containerSize / 2;
        const bottom = centerY + params.containerSize / 2;
        
        // Update particles
        const color = getFluidColor();
        
        particles.forEach((particle, i) => {
            // Apply gravity
            particle.vy += params.gravity * 0.01;
            
            // Temperature effect (random motion)
            const tempFactor = params.temperature / 50;
            particle.vx += (Math.random() - 0.5) * tempFactor * 0.1;
            particle.vy += (Math.random() - 0.5) * tempFactor * 0.1;
            
            // Viscosity dampening
            const dampening = 1 - params.viscosity * 0.02;
            particle.vx *= dampening;
            particle.vy *= dampening;
            
            // Surface tension (in low gravity)
            if (params.gravity < 2) {
                const dx = centerX - particle.x;
                const dy = centerY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    const force = params.surfaceTension * 0.001;
                    particle.vx += (dx / distance) * force;
                    particle.vy += (dy / distance) * force;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Collision with container walls
            if (particle.x - particle.radius < left) {
                particle.x = left + particle.radius;
                particle.vx *= -0.8;
            }
            if (particle.x + particle.radius > right) {
                particle.x = right - particle.radius;
                particle.vx *= -0.8;
            }
            if (particle.y - particle.radius < top) {
                particle.y = top + particle.radius;
                particle.vy *= -0.8;
            }
            if (particle.y + particle.radius > bottom) {
                particle.y = bottom - particle.radius;
                particle.vy *= -0.8;
            }
            
            // Particle-particle collisions
            for (let j = i + 1; j < particles.length; j++) {
                const other = particles[j];
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = particle.radius + other.radius;
                
                if (distance < minDist) {
                    // Simple elastic collision
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);
                    
                    // Separate particles
                    const overlap = minDist - distance;
                    particle.x -= overlap * cos * 0.5;
                    particle.y -= overlap * sin * 0.5;
                    other.x += overlap * cos * 0.5;
                    other.y += overlap * sin * 0.5;
                    
                    // Exchange velocities (simplified)
                    const tempVx = particle.vx;
                    const tempVy = particle.vy;
                    particle.vx = other.vx * 0.9;
                    particle.vy = other.vy * 0.9;
                    other.vx = tempVx * 0.9;
                    other.vy = tempVy * 0.9;
                }
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            // Add glow in low gravity
            if (params.gravity < 2) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Preset button handlers
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const preset = btn.dataset.preset;
            const config = presets[preset];
            
            if (config) {
                params.gravity = config.gravity;
                params.temperature = config.temperature;
                params.viscosity = config.viscosity;
                
                // Update UI
                document.getElementById('gravity').value = params.gravity;
                document.getElementById('gravityValue').textContent = params.gravity.toFixed(2);
                document.getElementById('temperature').value = params.temperature;
                document.getElementById('temperatureValue').textContent = params.temperature;
                document.getElementById('viscosity').value = params.viscosity;
                document.getElementById('viscosityValue').textContent = params.viscosity;
                
                updateInfoPanel();
            }
        });
    });
    
    // Fluid type button handlers
    document.querySelectorAll('.fluid-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.fluid-type-btn').forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            params.fluidType = btn.dataset.fluid;
            initParticles();
        });
    });
    
    // Parameter slider handlers
    document.getElementById('gravity').addEventListener('input', (e) => {
        params.gravity = parseFloat(e.target.value);
        document.getElementById('gravityValue').textContent = params.gravity.toFixed(1);
        updateInfoPanel();
    });
    
    document.getElementById('temperature').addEventListener('input', (e) => {
        params.temperature = parseInt(e.target.value);
        document.getElementById('temperatureValue').textContent = params.temperature;
    });
    
    document.getElementById('containerSize').addEventListener('input', (e) => {
        params.containerSize = parseInt(e.target.value);
        document.getElementById('containerSizeValue').textContent = params.containerSize;
    });
    
    document.getElementById('viscosity').addEventListener('input', (e) => {
        params.viscosity = parseInt(e.target.value);
        document.getElementById('viscosityValue').textContent = params.viscosity;
    });
    
    // Start simulation
    initParticles();
    updateInfoPanel();
    animate();
});
