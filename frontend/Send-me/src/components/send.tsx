import React, { useState } from 'react';
import  '../style/send.css'; // Add this line to import the CSS file

const SendEmail: React.FC = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the email sending logic here
        console.log('Email sent with subject:', subject);
        console.log('Email content:', content);
    };

    return (
        <div className='send-email'> {/* Add the class name here */}
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'> {/* Add the class name here */}
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group1'> {/* Add the class name here */}
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
            </form>
            <button type="submit">Send</button>
        </div>
    );
};

export default SendEmail;