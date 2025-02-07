import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/send');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <div>
          <img src="/path/to/logo.png" alt="Send Me Logo" style={{ height: '40px' }} />
        </div>
        <div>
          <img src="/path/to/profile.png" alt="Profile" style={{ height: '40px', borderRadius: '50%' }} />
        </div>
      </header>
      <div style={{ padding: '20px' }}>
        <h2>Messages</h2>
        <div>
          {/* Render messages here */}
        </div>
      </div>
      <button onClick={handleSendClick} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Send
      </button>
    </div>
  );
};

export default Main;