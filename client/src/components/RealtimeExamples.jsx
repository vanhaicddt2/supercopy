import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useRealtimeUpdate } from '../hooks/useRealtimeUpdate';

/**
 * Example Component: Real-time Connection Status
 * Shows whether the app is connected to the server in real-time
 */
export function ConnectionStatus() {
  const { isConnected } = useSocket();

  return (
    <div style={{
      padding: '10px 15px',
      borderRadius: '5px',
      backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
      color: isConnected ? '#155724' : '#721c24',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: isConnected ? '#28a745' : '#dc3545',
        display: 'inline-block',
        animation: isConnected ? 'pulse 2s infinite' : 'none',
      }}></span>
      {isConnected ? '✅ Real-time Connected' : '❌ Connection Lost'}
    </div>
  );
}

/**
 * Example Component: Listen for real-time updates
 * This component listens for 'log:updated' event from server
 */
export function RealtimeLogsExample() {
  const { socket, isConnected } = useSocket();
  const [recentUpdate, setRecentUpdate] = useState(null);

  useRealtimeUpdate('log:updated', (data) => {
    console.log('📡 New log update:', data);
    setRecentUpdate(data);
  });

  return (
    <div>
      <h4>Latest Real-time Update:</h4>
      {recentUpdate ? (
        <div style={{ padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
          <p><strong>Type:</strong> {recentUpdate.type}</p>
          <p><strong>Message:</strong> {recentUpdate.message}</p>
          <p><strong>Time:</strong> {recentUpdate.timestamp}</p>
        </div>
      ) : (
        <p>Waiting for updates...</p>
      )}
    </div>
  );
}

/**
 * Example Component: Send events to server
 * Demonstrates how to emit custom events to the server
 */
export function SendEventExample() {
  const { socket } = useSocket();

  const handleSendEvent = () => {
    if (socket) {
      socket.emit('custom:event', {
        message: 'Hello from frontend!',
        action: 'test_action',
      });
      alert('Event sent to server!');
    }
  };

  return (
    <button
      onClick={handleSendEvent}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Send Event to Server
    </button>
  );
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Simple connection status display:
 * <ConnectionStatus />
 * 
 * 2. Listen for specific events:
 * const { isListening } = useRealtimeUpdate('event_name', (data) => {
 *   console.log('Data:', data);
 * });
 * 
 * 3. Emit event to server:
 * socket.emit('event_name', { data: 'value' });
 * 
 * 4. Join user room:
 * socket.emit('join_user', userId);
 */
