import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import Navbar from '../Navbar';

function Chat({ currentUser }) {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationPartner, setConversationPartner] = useState('');
  const database = getDatabase();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatRef = ref(database, `chats/${userId}/Messaging`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList);
        // Get selectedUser from Messaging database if currentUser matches
        if (currentUser && currentUser.email) {
          setConversationPartner(currentUser.name); // Set conversation partner to currentUser initially
          if (data[currentUser.email]) {
            const selectedUser = data[currentUser.email].selectedUser;
            setConversationPartner(selectedUser);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [database, userId, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    const messageData = {
      text: newMessage,
      sender: 'currentUser',
      timestamp: new Date().toISOString(),
    };

    try {
      const chatRef = ref(database, `chats/${conversationPartner}/Messaging`);
      await push(chatRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '89vh' }}>
        <div style={{ display: 'flex', width: '98%', justifyContent: 'center' }}>
          <div style={{ width: '10%', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}>
            <h3>{conversationPartner}</h3>
          </div>
          <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '20px',
                overflowY: 'scroll',
                marginBottom: '20px',
                height: '60vh',
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '10px',
                    textAlign: message.sender === 'currentUser' ? 'right' : 'left',
                  }}
                >
                  <strong>{message.sender === 'currentUser' ? 'You' : conversationPartner}:</strong> {message.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{
                  width: '90%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                style={{
                  marginLeft: '10px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
