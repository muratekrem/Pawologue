import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push, child, update } from 'firebase/database';
import Navbar from '../Navbar';

function Chat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationPartners, setConversationPartners] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activePartner, setActivePartner] = useState(null);
  const database = getDatabase();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
      console.log('Current user loaded:', JSON.parse(storedCurrentUser));
    } else {
      console.log('No current user found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      console.log('No currentUser yet, returning');
      return; // currentUser null ise, işlemi durdur
    }

    console.log('Setting up chat reference');
    const chatRef = ref(database, 'conversations');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data snapshot:', data);
      if (data) {
        // currentUser is either currentUser or selectedUser in any conversation
        const userConversations = Object.keys(data).filter(key =>
          key.includes(currentUser.name)
        );

        const partners = userConversations.map(key => 
          key.split('_').find(name => name !== currentUser.name)
        );

        setConversationPartners(partners);
      } else {
        console.log('No data found in Messaging');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [database, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !activePartner) {
      return;
    }

    const messageData = {
      text: newMessage,
      sender: currentUser.name,
      timestamp: new Date().toISOString(),
    };

    const conversationKey = [currentUser.name, activePartner].sort().join('_');
    const conversationRef = ref(database, `conversations/${conversationKey}/messages`);

    try {
      await push(conversationRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async (partner) => {
    setActivePartner(partner);
    const conversationKey = [currentUser.name, partner].sort().join('_');
    const conversationRef = ref(database, `conversations/${conversationKey}/messages`);

    onValue(conversationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]);
      }
    });
  };

  const handleStartConversation = (partner) => {
    if (!conversationPartners.includes(partner)) {
      setConversationPartners([...conversationPartners, partner]);
    }
    fetchMessages(partner);
  };

  useEffect(() => {
    if (userId && currentUser) {
      handleStartConversation(userId);
    }
  }, [userId, currentUser]);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '89vh' }}>
        <div style={{ display: 'flex', width: '98%', justifyContent: 'center' }}>
          <div style={{ width: '10%', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}>
          {conversationPartners.map((partner) => (
              <h3 key={partner} style={{ border: 'groove', cursor: 'pointer' }} onClick={() => handleStartConversation(partner)}>
                {partner}
              </h3>
            ))}
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
                  key={message.timestamp}
                  style={{
                    marginBottom: '10px',
                    textAlign: message.sender === currentUser.name ? 'right' : 'left',
                  }}
                >
                  <strong>{message.sender === currentUser.name ? 'You' : message.sender}:</strong> {message.text}
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

