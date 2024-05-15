import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { getDatabase, ref, push, onValue } from "firebase/database";

function Chat({ createdBy }) {
  const { userId } = useParams(); // Adopt bileşeninden gelen ilan sahibinin ID'sini al
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationPartner, setConversationPartner] = useState("");
  const database = getDatabase();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Firebase'den ilgili sohbetin mesajlarını al
    const chatRef = ref(database, `chats/${userId}/messages`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList);
        // İlan sahibinin adını ayarla
        setConversationPartner(createdBy);
      }
    });

    // Temizlik işlemi
    return () => {
      unsubscribe();
    };
  }, [database, userId, createdBy]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    const messageData = {
      text: newMessage,
      sender: "currentUser",
      timestamp: new Date().toISOString(),
    };

    try {
      const chatRef = ref(database, `chats/${conversationPartner}/messages`);
      await push(chatRef, messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "89vh" }}>
        <div style={{ display: "flex", width: "98%", justifyContent: "center" }}>
          <div style={{ width: "10%" }}>
            <h3>{conversationPartner}</h3>
          </div>
          <div style={{ width: "80%", display: "flex", flexDirection: "column" }}>
            <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "20px", overflowY: "scroll", marginBottom: "20px", height: "60vh" }}>
              {messages.map((message) => (
                <div key={message.id} style={{ marginBottom: "10px", textAlign: message.sender === "currentUser" ? "right" : "left" }}>
                  <strong>{message.sender === "currentUser" ? "You" : conversationPartner}:</strong> {message.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "80%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
