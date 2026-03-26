const TechStack = () => {
  return (
    <div className="techstack" style={{ padding: '100px 5%', background: 'transparent', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '60px', textAlign: 'center', fontWeight: 600 }}> My Tech Stack</h2>
      <div className="tech-marquee" style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1000px', margin: '0 auto'
      }}>
        {['Embedded C', 'C++', 'Python', 'ARM Architecture', '8051 Microcontroller', 'Machine Learning', 'OpenCV', 'FastAPI', 'Flask', 'HTML/CSS', 'Git/GitHub', 'RTOS', 'Linux'].map((tech) => (
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
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
