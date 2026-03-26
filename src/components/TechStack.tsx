import { useEffect, useRef } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, vx: number, vy: number, update: () => void, draw: () => void}[] = [];
    const numParticles = window.innerWidth < 768 ? 40 : 80;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 600;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(200, 200, 255, 0.4)';
        ctx!.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) particles.push(new Particle());

    let mouse = { x: -1000, y: -1000 };
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    // Need to use mousemove on window or document since TechStack zIndex is different
    window.addEventListener('mousemove', handleMouse);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
        
        // Connect to mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(150, 180, 255, ${1 - distMouse/180})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 200, 255, ${0.15 * (1 - dist/100)})`;
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none'}} />
};

const TechStack = () => {
  return (
    <div className="techstack" style={{ position: 'relative', overflow: 'hidden', padding: '100px 5%', background: '#0a0a0f', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ParticleNetwork />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '60px', textAlign: 'center', fontWeight: 600 }}> My Tech Stack</h2>
        <div className="tech-marquee" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1000px', margin: '0 auto'
        }}>
          {['Embedded C', 'C++', 'Python', 'ARM Architecture', '8051 Microcontroller', 'Machine Learning', 'OpenCV', 'FastAPI', 'Flask', 'HTML/CSS', 'Git/GitHub', 'RTOS', 'Linux', 'Pandas', 'NumPy'].map((tech) => (
            <div key={tech} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '20px 40px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '1.2rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(80,180,255,0.4)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(80,180,255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
