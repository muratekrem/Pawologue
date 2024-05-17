import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import Navbar from '../Navbar';

function Chat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationPartner, setConversationPartner] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
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
    const chatRef = ref(database, 'Messaging');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data snapshot:', data);
      if (data) {
        // Doğru conversation partner'i bulmak için currentUser ve selectedUser ile eşleşen veriyi bul
        const userConversation = Object.values(data).find(conversation => 
          (conversation.currentUser === currentUser.name && conversation.selectedUser === userId) ||
          (conversation.currentUser === userId && conversation.selectedUser === currentUser.name)
        );
        
        if (userConversation) {
          console.log('User conversation found:', userConversation);
          setConversationPartner(userConversation.selectedUser === currentUser.name ? userConversation.currentUser : userConversation.selectedUser);
          console.log('Conversation partner set to:', userConversation.selectedUser === currentUser.name ? userConversation.currentUser : userConversation.selectedUser);
          setMessages(userConversation.messages || []);
          console.log('Messages set:', userConversation.messages);
        } else {
          console.log('No matching conversation found');
        }
      } else {
        console.log('No data found in Messaging');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [database, currentUser, userId]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://pawologue-default-rtdb.firebaseio.com/Messaging.json`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const userConversation = Object.values(data).find(conversation => 
              conversation.currentUser === currentUser.name
            );

            if (userConversation) {
              console.log('User conversation found:', userConversation);
              console.log('Selected user:', userConversation.selectedUser);
              setConversationPartner(userConversation.selectedUser);
              console.log('Conversation partner set to:', userConversation.selectedUser);
              setMessages(userConversation.messages || []);
              console.log('Messages set:', userConversation.messages);
            } else {
              console.log('No matching conversation found');
            }
          } else {
            console.log('No data found in Messaging');
          }
        } else {
          console.error('Error fetching messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) {
      return;
    }

    const messageData = {
      text: newMessage,
      sender: currentUser.name,
      timestamp: new Date().toISOString(),
    };

    try {
      const chatRef = ref(database, 'Messaging');
      await push(chatRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleStartConversation = async (selectedUser) => {
    try {
      const response = await fetch("https://pawologue-default-rtdb.firebaseio.com/Messaging.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const userConversation = Object.values(data).find(conversation => 
            conversation.currentUser === currentUser.name &&
            conversation.selectedUser === selectedUser
          );

          if (userConversation) {
            console.log('User conversation found:', userConversation);
            setConversationPartner(selectedUser);
            console.log('Conversation partner set to:', selectedUser);
            setMessages(userConversation.messages || []);
            console.log('Messages set:', userConversation.messages);
          } else {
            console.log('No matching conversation found');
          }
        } else {
          console.log('No data found in Messaging');
        }
      } else {
        console.error("Error fetching messaging data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching messaging data:", error);
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
                  key={message.timestamp}
                  style={{
                    marginBottom: '10px',
                    textAlign: message.sender === currentUser.name ? 'right' : 'left',
                  }}
                >
                  <strong>{message.sender === currentUser.name ? 'You' : conversationPartner}:</strong> {message.text}
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
