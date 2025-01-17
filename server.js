require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const documentRoutes = require('./routes/documentRoutes');
const Document = require('./models/Document');

// Initialize App and WebSocket server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(express.json());
app.use(logger);
app.use('/api/documents', documentRoutes);

// Connect to MongoDB
connectDB();

// WebSocket Handling
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('get-document', async (id) => {
    const document = await Document.findById(id) || new Document({ _id: id });
    socket.join(id);
    socket.emit('load-document', document.content);

    socket.on('edit-document', async (content) => {
      await Document.findByIdAndUpdate(id, { content });
      socket.to(id).emit('update-document', content);
    });
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
