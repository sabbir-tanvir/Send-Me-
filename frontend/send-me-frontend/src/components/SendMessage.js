import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/api';
import { getUsers } from '../services/api';

const SendMessage = () => {
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !content) {
      return alert('Please select a recipient and enter a message.');
    }

    await sendMessage({ content, recipient });
    setContent('');
    setRecipient('');
    alert('Message sent successfully!');
  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Select a recipient</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="content">Message:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SendMessage;