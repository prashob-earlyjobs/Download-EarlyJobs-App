import React, { useEffect } from 'react';
import { initializeMarketingData } from './utils/marketingData';
import DownloadButton from './components/DownloadButton';
import PlatformInfo from './components/PlatformInfo';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize marketing data tracking on component mount
    initializeMarketingData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">EarlyJobs</h1>
          <p className="subtitle">Your gateway to early career opportunities</p>
        </header>

        <main className="main-content">
          <PlatformInfo />
          
          <div className="download-section">
            <h2 className="section-title">Get Started</h2>
            <p className="section-description">
              Download the EarlyJobs app and start your career journey today
            </p>
            <DownloadButton 
              androidUrl="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs&hl=en_IN"
              iosUrl="https://apps.apple.com/in/app/earlyjobs-ai/id6754554572"
              webUrl="https://earlyjobs.ai"
            />
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Early Access</h3>
              <p>Get exclusive access to early career opportunities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Career Growth</h3>
              <p>Connect with top employers and grow your career</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Best Matches</h3>
              <p>Find the perfect job matches tailored for you</p>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 EarlyJobs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

