# 🚀 SuperCopy PWA & Real-time Quick Start

## ⚡ Installation Required

First, install the new dependencies:

```bash
# Backend
npm install

# Frontend
cd client && npm install
```

---

## 📱 Test PWA Installation

### Quick Test:
```bash
# Start development
npm run dev

# Or separately:
npm run server        # Terminal 1 - Backend
cd client && npm start # Terminal 2 - Frontend
```

Then open `http://localhost:3000` and look for install button in Chrome.

---

## 🔄 Real-time Example

### Backend - Emit Update:
```javascript
// In any route handler
router.post('/logs', async (req, res) => {
  const log = await Log.create(req.body);
  
  // Send real-time update to all users
  global.emitRealtimeUpdate('log:updated', {
    type: 'log_created',
    log: log,
  });
  
  res.json(log);
});
```

### Frontend - Listen to Update:
```jsx
import { useSocket } from '../context/SocketContext';

function MyComponent() {
  const { socket, isConnected } = useSocket();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('log:updated', (data) => {
      if (data.type === 'log_created') {
        setLogs(prev => [...prev, data.log]);
      }
    });

    return () => socket.off('log:updated');
  }, [socket]);

  return (
    <div>
      Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}
      <ul>
        {logs.map(log => <li key={log._id}>{log.title}</li>)}
      </ul>
    </div>
  );
}
```

---

## 🛠️ Available Hooks

```javascript
import { useSocket } from '../context/SocketContext';
import { useRealtimeUpdate, useSocketStatus, useSocketEmit } from '../hooks/useRealtimeUpdate';

// Get socket instance
const { socket, isConnected } = useSocket();

// Listen for specific event
useRealtimeUpdate('event_name', (data) => {
  console.log('Data:', data);
});

// Check connection status
const { isConnected } = useSocketStatus();

// Emit event to server
const { emit } = useSocketEmit();
emit('event_name', { data: 'value' });
```

---

## 📋 Checklist

- [ ] Run `npm install` in root directory
- [ ] Run `cd client && npm install` in frontend
- [ ] Start backend: `npm run server`
- [ ] Start frontend: `cd client && npm start`
- [ ] Test PWA install on Chrome
- [ ] Try real-time example code above
- [ ] Add to your components

---

## 🔍 Debug Tips

### Check Socket Connected:
```javascript
// In any component
const { isConnected } = useSocket();
console.log('Socket connected:', isConnected);
```

### Monitor Events:
```javascript
// Browser console
socket.onAny((event, ...args) => {
  console.log(`🔊 [${event}]`, args);
});
```

### Test Emit from Browser:
```javascript
// Browser console
socket.emit('test:event', { message: 'hello' });
```

---

## 📂 Key Files

**Frontend:**
- `client/src/context/SocketContext.jsx` - Connection provider
- `client/src/hooks/useRealtimeUpdate.js` - Hooks
- `client/src/components/RealtimeExamples.jsx` - Examples

**Backend:**
- `server.js` - Socket.io server setup

**Config:**
- `client/public/manifest.json` - PWA metadata
- `client/public/index.html` - PWA meta tags

---

## 🎯 Next: Add to Your Pages

See `PWA_REALTIME_SETUP.md` for full documentation.

Quick example:
```jsx
// pages/LogsPage.jsx
import { useSocket } from '../context/SocketContext';
import { ConnectionStatus } from '../components/RealtimeExamples';

export default function LogsPage() {
  const { socket, isConnected } = useSocket();
  
  useEffect(() => {
    if (!socket) return;
    socket.on('log:updated', handleLogUpdate);
    return () => socket.off('log:updated');
  }, [socket]);

  return (
    <div>
      <ConnectionStatus />
      {/* Your log list here */}
    </div>
  );
}
```

---

**Ready to use!** 🎉
