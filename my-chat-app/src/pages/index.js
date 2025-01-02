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
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {chatLog.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#E5E5EA', padding: '10px', borderRadius: '10px' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex' }}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="输入你的消息..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>发送</button>
      </form>
    </div>
  );
}
