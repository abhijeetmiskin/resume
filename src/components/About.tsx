import "./styles/About.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.from(".title", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".para", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <div className="about-section" id="about" ref={container}>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Undergraduate Researcher at KLE Technological University pursuing a B.E. in Electronics and Communication. Passionate about Deep Learning, Machine Learning, and Web Development. Experienced in building AI-based systems and full-stack platforms.
        </p>
      </div>
    </div>
  );
};

export default About;
