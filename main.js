const socket = io();

let localStream;
let peerConnection;

const localVideo = document.getElementById('local-video');
const remoteVideoContainer = document.getElementById('remote-video-container');
const joinButton = document.getElementById('join-btn');
const leaveButton = document.getElementById('leave-btn');
const toggleMicButton = document.getElementById('toggle-mic-btn');
const toggleCameraButton = document.getElementById('toggle-camera-btn');

joinButton.addEventListener('click', joinCall);
leaveButton.addEventListener('click', leaveCall);
toggleMicButton.addEventListener('click', toggleMic);
toggleCameraButton.addEventListener('click', toggleCamera);

async function joinCall() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStream = stream;
        localVideo.srcObject = stream;

        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        peerConnection = new RTCPeerConnection(configuration);

        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = handleRemoteStreamAdded;
        peerConnection.onicecandidate = handleICECandidateEvent;

        const room = 'prabhat-room'; // Replace with dynamic room handling or room name
        socket.emit('joinRoom', room);

        joinButton.disabled = true;
        leaveButton.disabled = false;
        toggleMicButton.disabled = false;
        toggleCameraButton.disabled = false;
    } catch (error) {
        console.error('Error joining call:', error);
    }
}

function leaveCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }

    localVideo.srcObject = null;
    remoteVideoContainer.innerHTML = '';

    joinButton.disabled = false;
    leaveButton.disabled = true;
    toggleMicButton.disabled = true;
    toggleCameraButton.disabled = true;

    socket.emit('leaveRoom');
}

function handleRemoteStreamAdded(event) {
    const remoteVideo = document.createElement('video');
    remoteVideo.autoplay = true;
    remoteVideo.srcObject = event.streams[0];
    remoteVideoContainer.appendChild(remoteVideo);
}

function handleICECandidateEvent(event) {
    if (event.candidate) {
        socket.emit('iceCandidate', event.candidate);
    }
}

function toggleMic() {
    if (localStream) {
        localStream.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
            toggleMicButton.innerText = track.enabled ? 'Toggle Mic Off' : 'Toggle Mic On';
        });
    }
}

function toggleCamera() {
    if (localStream) {
        localStream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
            toggleCameraButton.innerText = track.enabled ? 'Toggle Camera Off' : 'Toggle Camera On';
        });
    }
}
