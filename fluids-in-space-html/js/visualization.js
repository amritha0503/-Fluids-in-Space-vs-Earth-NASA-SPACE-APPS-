// Visualization - Complete React Match with Detailed Graphics
document.addEventListener('DOMContentLoaded', () => {
    const earthCanvas = document.getElementById('earthCanvas');
    const spaceCanvas = document.getElementById('spaceCanvas');
    const explanationCard = document.getElementById('explanationCard');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (!earthCanvas || !spaceCanvas || !explanationCard) return;
    
    let isPlaying = true;
    let currentScenario = 'droplet';
    let time = 0;
    let animationId = null;
    
    // Get contexts
    const earthCtx = earthCanvas.getContext('2d');
    const spaceCtx = spaceCanvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvases() {
        const dpr = window.devicePixelRatio || 1;
        [earthCanvas, spaceCanvas].forEach(canvas => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        });
    }
    
    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);
    
    // Get actual drawing dimensions
    function getCanvasDimensions() {
        return {
            width: earthCanvas.getBoundingClientRect().width,
            height: earthCanvas.getBoundingClientRect().height
        };
    }
    
    // Scenario explanations matching React
    const scenarios = {
        droplet: {
            title: '🌊 Water Droplet Formation',
            earth: {
                heading: 'On Earth 🌍',
                points: [
                    'Gravity pulls water downward',
                    'Water takes the shape of its container',
                    'Flat surfaces form at the top',
                    'Droplets are tear-shaped when falling'
                ]
            },
            space: {
                heading: 'In Space 🚀',
                points: [
                    'Surface tension dominates behavior',
                    'Water forms perfect spheres',
                    'No "up" or "down" orientation',
                    'Spheres float freely without falling'
                ]
            },
            physics: 'Surface tension is the result of cohesive forces between liquid molecules. On Earth, gravity overcomes this force. In microgravity, surface tension pulls the liquid into the shape with minimum surface area—a sphere. This is why astronauts\' water forms floating balls!'
        },
        convection: {
            title: '🌡️ Marangoni Convection',
            earth: {
                heading: 'On Earth 🌍',
                points: [
                    'Hot fluid rises, cold fluid sinks',
                    'Buoyancy-driven convection',
                    'Predictable circulation patterns',
                    'Gravity dominates the flow'
                ]
            },
            space: {
                heading: 'In Space 🚀',
                points: [
                    'Surface tension gradients drive flow',
                    'Temperature affects surface tension',
                    'Complex, unexpected patterns',
                    'Flow from hot to cold regions on surface'
                ]
            },
            physics: 'Marangoni convection occurs when surface tension varies across a liquid\'s surface (due to temperature or concentration differences). In microgravity, this becomes the primary heat transfer mechanism. This effect is crucial for materials processing in space and affects everything from crystal growth to welding operations.'
        },
        colloid: {
            title: '⚛️ Colloid Self-Assembly',
            earth: {
                heading: 'On Earth 🌍',
                points: [
                    'Particles settle due to gravity',
                    'Sedimentation prevents organization',
                    'Density differences cause separation',
                    'Limited crystal formation'
                ]
            },
            space: {
                heading: 'In Space 🚀',
                points: [
                    'Particles remain suspended indefinitely',
                    'Self-organize into crystal structures',
                    'Long-range order develops',
                    'Unique materials can form'
                ]
            },
            physics: 'Colloids are mixtures with particles sized between 1-1000 nanometers. On Earth, gravity causes these particles to settle. In microgravity, colloidal particles can spontaneously organize into ordered structures called "colloidal crystals." These structures have potential applications in photonics, sensors, and advanced materials. NASA\'s Physical Sciences Informatics (PSI) database contains extensive research on colloidal behavior in space.'
        },
        mixing: {
            title: '🌀 Fluid Mixing',
            earth: {
                heading: 'On Earth 🌍',
                points: [
                    'Density differences drive mixing',
                    'Stirring creates turbulent flow',
                    'Heavier fluids sink naturally',
                    'Convection assists mixing'
                ]
            },
            space: {
                heading: 'In Space 🚀',
                points: [
                    'No natural density-driven mixing',
                    'Requires active stirring/agitation',
                    'Fluids can remain separate',
                    'Different mixing strategies needed'
                ]
            },
            physics: 'Without gravity, fluids of different densities don\'t automatically separate or mix. This presents unique challenges for space operations like fuel management, life support systems, and food preparation. Astronauts must use special techniques to mix drinks and manage water supplies. Understanding microgravity mixing is essential for long-duration space missions.'
        }
    };
    
    // Update explanation card
    function updateExplanation(scenario) {
        const data = scenarios[scenario];
        explanationCard.innerHTML = `
            <h2>${data.title}</h2>
            <div class="explanation-content">
                <div class="explanation-column">
                    <h3>${data.earth.heading}</h3>
                    <ul>
                        ${data.earth.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                <div class="explanation-column">
                    <h3>${data.space.heading}</h3>
                    <ul>
                        ${data.space.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="science-explanation">
                <strong>The Physics:</strong> ${data.physics}
            </div>
        `;
    }
    
    // Animation functions for different scenarios
    function animateDroplet(ctx, currentTime, isMicrogravity) {
        const { width, height } = getCanvasDimensions();
        
        ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
        ctx.fillRect(0, 0, width, height);
        
        if (isMicrogravity) {
            // Perfect sphere floating in center
            const x = width / 2;
            const y = height / 2 + Math.sin(currentTime * 0.001) * 20;
            const radius = 60;
            
            // Main droplet with gradient
            const gradient = ctx.createRadialGradient(
                x - radius * 0.3, y - radius * 0.3, 0,
                x, y, radius
            );
            gradient.addColorStop(0, 'rgba(100, 200, 255, 0.9)');
            gradient.addColorStop(1, 'rgba(0, 100, 200, 0.6)');
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Highlight
            ctx.beginPath();
            ctx.arc(x - 20, y - 20, 15, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 30;
            ctx.shadowColor = 'rgba(0, 191, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 191, 255, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;
            
        } else {
            // Water in container on Earth
            const containerX = width / 2;
            const containerY = height / 2;
            const containerWidth = 120;
            const containerHeight = 150;
            
            // Container
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.strokeRect(
                containerX - containerWidth / 2,
                containerY - containerHeight / 2,
                containerWidth,
                containerHeight
            );
            
            // Water inside (settled at bottom)
            const waterHeight = 100;
            const waterY = containerY + containerHeight / 2 - waterHeight;
            
            const gradient = ctx.createLinearGradient(
                0, waterY,
                0, containerY + containerHeight / 2
            );
            gradient.addColorStop(0, 'rgba(0, 150, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(0, 100, 200, 0.8)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                containerX - containerWidth / 2 + 3,
                waterY,
                containerWidth - 6,
                waterHeight
            );
            
            // Water surface (slightly wavy)
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x <= containerWidth - 6; x += 5) {
                const waveY = waterY + Math.sin(x * 0.2 + currentTime * 0.003) * 2;
                if (x === 0) {
                    ctx.moveTo(containerX - containerWidth / 2 + 3 + x, waveY);
                } else {
                    ctx.lineTo(containerX - containerWidth / 2 + 3 + x, waveY);
                }
            }
            ctx.stroke();
        }
    }
    
    function animateConvection(ctx, currentTime, isMicrogravity) {
        const { width, height } = getCanvasDimensions();
        
        ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        if (isMicrogravity) {
            // Marangoni convection - surface flow patterns
            const numParticles = 30;
            const radius = 70;
            
            // Draw fluid sphere with temperature gradient
            const gradient = ctx.createRadialGradient(
                centerX - 20, centerY - 20, 0,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, 'rgba(255, 100, 100, 0.3)');
            gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(100, 100, 255, 0.5)');
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Surface flow particles
            for (let i = 0; i < numParticles; i++) {
                const angle = (i / numParticles) * Math.PI * 2 + currentTime * 0.001;
                const flowRadius = radius * 0.9;
                const x = centerX + Math.cos(angle) * flowRadius;
                const y = centerY + Math.sin(angle) * flowRadius;
                
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 200, 100, 0.8)';
                ctx.fill();
                
                // Flow direction arrows
                const arrowLength = 10;
                const arrowAngle = angle + Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(arrowAngle) * arrowLength,
                    y + Math.sin(arrowAngle) * arrowLength
                );
                ctx.strokeStyle = 'rgba(255, 200, 100, 0.6)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
        } else {
            // Buoyancy-driven convection
            const containerWidth = 120;
            const containerHeight = 150;
            
            // Container
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.strokeRect(
                centerX - containerWidth / 2,
                centerY - containerHeight / 2,
                containerWidth,
                containerHeight
            );
            
            // Hot bottom, cold top gradient
            const gradient = ctx.createLinearGradient(
                0, centerY + containerHeight / 2,
                0, centerY - containerHeight / 2
            );
            gradient.addColorStop(0, 'rgba(255, 100, 100, 0.5)');
            gradient.addColorStop(1, 'rgba(100, 100, 255, 0.5)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                centerX - containerWidth / 2 + 3,
                centerY - containerHeight / 2 + 3,
                containerWidth - 6,
                containerHeight - 6
            );
            
            // Rising and sinking particles
            const numParticles = 20;
            for (let i = 0; i < numParticles; i++) {
                const xPos = centerX - containerWidth / 2 + 20 + (i % 5) * 20;
                const yOffset = ((currentTime * 0.001 + i * 0.3) % 1);
                
                if (i < 10) {
                    // Rising hot particles
                    const y = centerY + containerHeight / 2 - yOffset * containerHeight;
                    ctx.beginPath();
                    ctx.arc(xPos, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 200, 100, 0.8)';
                    ctx.fill();
                } else {
                    // Sinking cold particles
                    const y = centerY - containerHeight / 2 + yOffset * containerHeight;
                    ctx.beginPath();
                    ctx.arc(xPos + 10, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
                    ctx.fill();
                }
            }
        }
    }
    
    function animateColloid(ctx, currentTime, isMicrogravity) {
        const { width, height } = getCanvasDimensions();
        
        ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const numParticles = 40;
        
        if (isMicrogravity) {
            // Organized crystal structure
            const gridSize = 6;
            const spacing = 25;
            const offsetX = centerX - (gridSize * spacing) / 2;
            const offsetY = centerY - (gridSize * spacing) / 2;
            
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const x = offsetX + j * spacing + Math.sin(currentTime * 0.002 + i + j) * 3;
                    const y = offsetY + i * spacing + Math.cos(currentTime * 0.002 + i + j) * 3;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
                    ctx.fill();
                    
                    // Draw connections
                    if (j < gridSize - 1) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + spacing, y);
                        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                    if (i < gridSize - 1) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + spacing);
                        ctx.stroke();
                    }
                }
            }
            
        } else {
            // Settled particles at bottom
            const containerWidth = 120;
            const containerHeight = 150;
            
            // Container
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.strokeRect(
                centerX - containerWidth / 2,
                centerY - containerHeight / 2,
                containerWidth,
                containerHeight
            );
            
            // Particles settling at bottom (use seeded random for consistency)
            const particles = [];
            for (let i = 0; i < numParticles; i++) {
                const seed = i * 123.456;
                const x = centerX - containerWidth / 2 + 10 + (Math.sin(seed) * 0.5 + 0.5) * (containerWidth - 20);
                const settleHeight = 30;
                const y = centerY + containerHeight / 2 - settleHeight + (Math.cos(seed) * 0.5 + 0.5) * settleHeight;
                particles.push({ x, y });
            }
            
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
                ctx.fill();
            });
        }
    }
    
    function animateMixing(ctx, currentTime, isMicrogravity) {
        const { width, height } = getCanvasDimensions();
        
        ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const containerWidth = 120;
        const containerHeight = 150;
        
        // Container
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 3;
        ctx.strokeRect(
            centerX - containerWidth / 2,
            centerY - containerHeight / 2,
            containerWidth,
            containerHeight
        );
        
        if (isMicrogravity) {
            // Two fluids remain separate
            const halfWidth = containerWidth / 2;
            
            // Blue fluid (left)
            ctx.fillStyle = 'rgba(0, 150, 255, 0.6)';
            ctx.fillRect(
                centerX - containerWidth / 2 + 3,
                centerY - containerHeight / 2 + 3,
                halfWidth - 3,
                containerHeight - 6
            );
            
            // Orange fluid (right)
            ctx.fillStyle = 'rgba(255, 150, 0, 0.6)';
            ctx.fillRect(
                centerX + 3,
                centerY - containerHeight / 2 + 3,
                halfWidth - 3,
                containerHeight - 6
            );
            
            // Interface
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - containerHeight / 2 + 3);
            ctx.lineTo(centerX, centerY + containerHeight / 2 - 3);
            ctx.stroke();
            
        } else {
            // Mixing with separation by density
            const mixProgress = (Math.sin(currentTime * 0.001) + 1) / 2;
            
            // Bottom (heavier fluid)
            const bottomHeight = containerHeight * 0.6;
            ctx.fillStyle = 'rgba(255, 150, 0, 0.7)';
            ctx.fillRect(
                centerX - containerWidth / 2 + 3,
                centerY + containerHeight / 2 - bottomHeight,
                containerWidth - 6,
                bottomHeight - 3
            );
            
            // Top (lighter fluid)
            ctx.fillStyle = 'rgba(0, 150, 255, 0.6)';
            ctx.fillRect(
                centerX - containerWidth / 2 + 3,
                centerY - containerHeight / 2 + 3,
                containerWidth - 6,
                containerHeight - bottomHeight - 3
            );
            
            // Mixing interface
            ctx.strokeStyle = `rgba(200, 150, 100, ${0.5 + mixProgress * 0.5})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let x = 0; x <= containerWidth - 6; x += 3) {
                const interfaceY = centerY + containerHeight / 2 - bottomHeight + 
                                  Math.sin(x * 0.3 + currentTime * 0.005) * 5 * mixProgress;
                if (x === 0) {
                    ctx.moveTo(centerX - containerWidth / 2 + 3 + x, interfaceY);
                } else {
                    ctx.lineTo(centerX - containerWidth / 2 + 3 + x, interfaceY);
                }
            }
            ctx.stroke();
        }
    }
    
    // Main animation loop
    function animate() {
        if (isPlaying) {
            time += 16;
        }
        
        // Select animation based on scenario
        switch (currentScenario) {
            case 'droplet':
                animateDroplet(earthCtx, time, false);
                animateDroplet(spaceCtx, time, true);
                break;
            case 'convection':
                animateConvection(earthCtx, time, false);
                animateConvection(spaceCtx, time, true);
                break;
            case 'colloid':
                animateColloid(earthCtx, time, false);
                animateColloid(spaceCtx, time, true);
                break;
            case 'mixing':
                animateMixing(earthCtx, time, false);
                animateMixing(spaceCtx, time, true);
                break;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Scenario selector buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentScenario = btn.dataset.scenario;
            updateExplanation(currentScenario);
        });
    });
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying 
            ? '<span class="btn-icon">⏸️</span><span class="btn-text">Pause</span>'
            : '<span class="btn-icon">▶️</span><span class="btn-text">Play</span>';
    });
    
    // Reset button
    resetBtn.addEventListener('click', () => {
        time = 0;
    });
    
    // Initialize
    updateExplanation(currentScenario);
    animate();
});
