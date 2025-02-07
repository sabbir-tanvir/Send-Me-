import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../style/style.module.css';
import axios from 'axios';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/inbox', {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });
        console.log("messager ", response);
        if (response.data.hasMessages) {

          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendClick = () => {
    navigate('/send');
  };

  return (
    <div className={style.maindiv}>
      <header className={style.header}>
        <div className={style.logo}>
          <img src="/5962463.png" alt="Send Me Logo" />
        </div>
        <div className={style.profile}>
          <img src="/12.jpg" alt="Profile" />
        </div>
      </header>

      <div className={style.container}>
        <h2>Messages</h2>
        <div className={style.messages}>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} className={style.message}>
                <p><strong>From:</strong> {message.sender.username}</p>
                <p><strong>Received:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                <p>{message.content}</p>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </div>
      <button className={style.button} onClick={handleSendClick} >
        Send
      </button>
    </div>
  );
};

export default Main;