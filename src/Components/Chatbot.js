import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages([...messages, { type: 'user', text: input }]);

    const genAI = new GoogleGenerativeAI('gemini-pro-api-key');

    const prompt=`
    You have been developed to help farmers to helps farmers by solving their doubts related to farming.
    Your role is to provide assitance to farmers based on their queries.
    Your first task is to recognize if question is ralted to farming or not, if question is not related to farming then give a response "I have beed developed by XYZ foundation to help farmers by solving their queries, your qurey doesn't seem realted to farming, that's why I cannot help with you that".
    Note: If user asks about your introduction, or anything about you, you should be able to answer it!   
    The input from user is: ${input}
    `

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const botMessage = response.text();

    setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: botMessage }]);
    setInput('');
    setIsLoading(false);
  };

  const boldText = (text) => {
    // Replace bold text wrapped in ** with <strong> tags
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace asterisks (*) with <br> tags for new lines
    text = text.replace(/\*/g, '<br>');

    return text;
}

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p dangerouslySetInnerHTML={{ __html: boldText(message.text) }}></p>
          </div>
        ))}
      </div>
      <form className="chatbot-form" onSubmit={handleSubmit}>
        <input
          className='userInput'
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
