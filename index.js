const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the main entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'prabhat-streams', 'public', 'index.html'));
});

// Socket.io logic here
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Add your socket.io event handling logic here
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
