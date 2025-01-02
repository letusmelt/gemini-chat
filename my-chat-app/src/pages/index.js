import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === '') return;

    setChatLog([...chatLog, { text: message, sender: 'user' }]);
    setMessage('');
    // 这里可以添加调用后端 API 的逻辑
    setTimeout(() => {
      setChatLog(prevChatLog => [...prevChatLog, { text: '你好！我是 AI 助手。', sender: 'ai' }]);
    }, 500);
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
