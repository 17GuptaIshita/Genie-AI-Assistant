'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main style={{ 
      width: '90%',
      maxWidth: 600, 
      height: '80vh',
      maxHeight: '700px',
      padding: 20, 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 12,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box'
    }}>
      {/* <h2 style={{ 
        marginBottom: 20, 
        fontFamily: '"Cedarville Cursive", Arial',
        color: '#333',
        textAlign: 'left',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>Genie</h2> */}
      

      {/* Chat Messages */}
      <div style={{ 
        flex: 1,
        overflowY: 'auto', 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#f8f9fa'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: 18,
                backgroundColor: message.role === 'user' ? '#007bff' : '#e9ecef',
                color: message.role === 'user' ? 'white' : '#333',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {message.content}
            </div>
            {message.role === 'assistant' && !isLoading && (
              <button
                onClick={() => handleCopy(message.id, message.content)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease',
                }}
                title={copiedMessageId === message.id ? 'Copied!' : 'Copy to clipboard'}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
              >
                {copiedMessageId === message.id ? (
                  <Check size={20} />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            )}
          </div>
        ))}

        {isLoading && (
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 18,
                backgroundColor: '#e9ecef',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              Genie is thinking...
            </div>
          </div>
        )}
        
        {/* Invisible div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: 16,
            borderRadius: 25,
            border: '1px solid #ddd',
            outline: 'none',
            backgroundColor: isLoading ? '#f8f9fa' : 'white',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            padding: '12px 24px',
            borderRadius: 25,
            border: 'none',
            backgroundColor: isLoading || !input.trim() ? '#ccc' : '#007bff',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            minWidth: '80px',
          }}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
      
      {/* Footer */}
      <div style={{
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'right',
        marginTop: '10px',
        opacity: 0.7
      }}>
        2025. Made with ❤️ by Ishita.
      </div>
    </main>
  );
}
