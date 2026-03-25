import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Undergraduate Researcher</h4>
                <h5>KLE Technological University</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Co-authored IEEE conference paper on self-supervised MRI denoising. Prepared medical imaging datasets and performed model evaluation using PSNR/SSIM metrics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hack Karnataka (Top 50 Finalist)</h4>
                <h5>Google Developer Group x KLE</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built an AI-based flood prediction system with 99.7% accuracy. Integrated OpenWeather API and developed a FastAPI real-time GIS dashboard.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>National Road Safety Hackathon</h4>
                <h5>IIT Madras</h5>
              </div>
              <h3>Dec 2025</h3>
            </div>
            <p>
              Participated in a national-level hackathon. Collaborated to design technology-driven safety concepts and applied rapid problem-solving skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
