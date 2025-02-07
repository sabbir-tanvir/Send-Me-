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

  const handleMessageClick = (message) => {
    navigate('/message', { state: { id: message._id, subject: message.subject, content: message.content } });
  };

  return (
    <div className={style.maindiv}>
      <header className={style.header}>
        <div className={style.logo}>
          <img src="/5962463.png" alt="Send Me Logo" />
        </div>
        <h1>Anonymous Message</h1>
        <div className={style.profile}>
          <img src="/profile.png" alt="Profile" />
        </div>
      </header>

      <div className={style.container}>
        <h2>Messages</h2>
        <div className={style.messages}>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} className={style.message} onClick={() => handleMessageClick(message)}>
                <div className={style.messageHeaderr}>
                  <div className={style.messageHeader}>
                    <h4><strong>Subject: </strong> {message.subject}</h4>
                  </div>
                  <div className={style.messageTime}>
                    <p><strong>Received:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className={style.messageContent}>
                  <p>{message.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
        <div>
        <button className={`${style.button} ${style.buttonRight}`} onClick={handleSendClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Main;