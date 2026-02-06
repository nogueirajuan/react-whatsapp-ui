import React from 'react';
import ChatContainer from './components/ChatContainer';
import { WebSocketProvider } from './context/WebSocketContext';
import './index.css';

const wsUrl = process.env.REACT_APP_WS_URL || 'ws://127.0.0.1:3001/ws';

function App() {
  return (
    <WebSocketProvider url={wsUrl}>
      <ChatContainer />
    </WebSocketProvider>
  );
}

export default App;
