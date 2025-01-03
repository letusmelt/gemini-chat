import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === '') return;

    setChatLog([...chatLog, { text: message, sender: 'user' }]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatLog(prevChatLog => [...prevChatLog, { text: data.reply, sender: 'ai' }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatLog(prevChatLog => [...prevChatLog, { text: 'Failed to get AI response.', sender: 'ai' }]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', paddingBottom: '100px', '&::-webkit-scrollbar': { display: 'none' } }}>
            {chatLog.map((msg, index) => (
                <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                    <span style={{ backgroundColor: msg.sender === 'user' ? '#E5E5EA' : '#FFFFFF', padding: '10px', borderRadius: '10px' }}>
                        {msg.text}
                    </span>
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', position: 'fixed', bottom: 0, width: '70%', backgroundColor: 'white', left: '50%', transform: 'translateX(-50%)', borderRadius: '10px' }}>
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Enter your message here:)"
                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f0f0f0', marginLeft: '10px' }}
            />
            <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '10px' }}>ENTER</button>
        </form>
    </div>
);
}
