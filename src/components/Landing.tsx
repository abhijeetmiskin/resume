import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";

const typewriterTexts = [
  "> sudo apt-get build ml-stack",
  "> make flash_8051",
  "> python train_model.py",
  "> deploying_algorithms.sh"
];

const Landing = ({ children }: PropsWithChildren) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: number;
    const i = loopNum % typewriterTexts.length;
    const fullText = typewriterTexts[i];

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
          setTypingSpeed(30);
        }, typingSpeed);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
          setTypingSpeed(Math.random() * 50 + 50);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <style>
          {`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}
        </style>
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ABHIJEET
              <br />
              <span>MISKIN</span>
            </h1>
          </div>
          <div className="landing-info" style={{marginTop: '2rem'}}>
            <div style={{ 
               fontFamily: '"Fira Code", monospace', 
               color: '#0f0', 
               background: 'rgba(5, 5, 5, 0.85)', 
               padding: '1.2rem 1.5rem', 
               borderRadius: '10px', 
               border: '1px solid #333',
               boxShadow: '0 10px 30px rgba(0, 255, 0, 0.1)',
               display: 'inline-block',
               minWidth: '320px',
               textAlign: 'left'
            }}>
              <div style={{display: 'flex', gap: '6px', marginBottom: '10px'}}>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56'}}></div>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e'}}></div>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f'}}></div>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '0.05em', fontWeight: 500 }}>
                {text}<span style={{ borderRight: '2px solid #0f0', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
              </h3>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
