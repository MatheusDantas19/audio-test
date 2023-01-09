// Set up the AudioContext.
const audioCtx = new AudioContext();

// const socket = io("http://192.168.0.104:8080")

// socket.on("connect", () => {
//     console.log(socket.id); // "G5p5..."
// });

// socket.emit("hello", "world");

// const socket = new WebSocket("wss://192.168.0.133:8080/channel");

// socket.onopen = function(e) {
//     alert("[open] Connection established");
//     alert("Sending to server");
//     socket.send("My name is John");
//   };
  
//   socket.onmessage = function(event) {
//     alert(`[message] Data received from server: ${event.data}`);
//   };
  
//   socket.onclose = function(event) {
//     if (event.wasClean) {
//       alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//     } else {
//       // e.g. server process killed or network down
//       // event.code is usually 1006 in this case
//       alert('[close] Connection died');
//     }
//   };
  
  // socket.onerror = function(error) {
  //   alert(`[error]`);
  // };

// Top-level variable keeps track of whether we are recording or not.
let recording = false;

// Ask user for access to the microphone.
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {

    // Instantiate the media recorder.
    const mediaRecorder = new MediaRecorder(stream);

    // Create a buffer to store the incoming data.
    let chunks = [];

    mediaRecorder.ondataavailable = (event) => {
        console.log(event.data)

        // socket.send("OI")

        chunks.push(event.data);
    }



    // When you stop the recorder, create a empty audio clip.
    mediaRecorder.onstop = (event) => {
      const audio = new Audio();
      audio.setAttribute("controls", "");
      $("#sound-clip").append(audio);
      $("#sound-clip").append("<br />");

      // Combine the audio chunks into a blob, then point the empty audio clip to that blob.
      const blob = new Blob(chunks, {"type": "audio/ogg; codecs=opus"});
      audio.src = window.URL.createObjectURL(blob);

      // Clear the `chunks` buffer so that you can record again.
      chunks = [];
    };

    // Set up event handler for the "Record" button.
    $("#record").on("click", () => {
      if (recording) {
        mediaRecorder.stop();
        recording = false;
        $("#record").html("Record");
      } else {
        mediaRecorder.start(1000);
        recording = true;
        
        $("#record").html("Stop");
      }
    });

  }).catch((err) => {
    // Throw alert when the browser is unable to access the microphone.
    alert("Oh no! Your browser cannot access your computer's microphone.");
  });
} else {
  // Throw alert when the browser cannot access any media devices.
  alert("Oh no! Your browser cannot access your computer's microphone. Please update your browser.");
}