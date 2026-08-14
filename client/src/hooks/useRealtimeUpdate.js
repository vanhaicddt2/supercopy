import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

/**
 * Hook để lắng nghe real-time updates từ server
 * @param {string} eventName - Tên sự kiện cần lắng nghe
 * @param {function} callback - Callback khi nhận dữ liệu
 */
export const useRealtimeUpdate = (eventName, callback) => {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleUpdate = (data) => {
      console.log(`📡 [${eventName}]:`, data);
      callback?.(data);
    };

    socket.on(eventName, handleUpdate);

    return () => {
      socket.off(eventName);
    };
  }, [socket, isConnected, eventName, callback]);

  return { isListening: isConnected };
};

/**
 * Hook để phát hiện khi Socket kết nối hoặc mất kết nối
 */
export const useSocketStatus = () => {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => console.log('✅ Connected to server');
    const handleDisconnect = () => console.log('❌ Disconnected from server');

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket]);

  return { isConnected };
};

/**
 * Hook để gửi event tới server
 */
export const useSocketEmit = () => {
  const { socket } = useSocket();

  const emit = (eventName, data) => {
    if (!socket) {
      console.warn('Socket not connected');
      return;
    }
    socket.emit(eventName, data);
  };

  return { emit };
};
