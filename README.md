<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prabhat Streams</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>Prabhat Streams</h1>
        <div id="local-video-container">
            <video id="local-video" autoplay muted></video>
        </div>
        <div id="remote-video-container"></div>
        <div id="controls">
            <button id="join-btn">Join Call</button>
            <button id="leave-btn">Leave Call</button>
            <button id="toggle-mic-btn">Toggle Mic</button> 
            
            <button id="toggle-camera-btn">Toggle Camera</button>
        </div>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script src="main.js"></script>
</body>
</html>
