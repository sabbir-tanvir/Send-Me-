import React, { useEffect, useState } from 'react';
import { fetchInboxMessages } from '../services/api';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await fetchInboxMessages();
        setMessages(data.messages);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Inbox</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <strong>From:</strong> {message.sender.username} <br />
              <strong>Message:</strong> {message.content} <br />
              <strong>Received:</strong> {new Date(message.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;