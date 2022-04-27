let parts = [];
let mediaRecorder;
let videoWindow = document.querySelector(".preview-window");

window.onload = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      document.getElementById("video").srcObject = stream;
      document.getElementById("startBtn").addEventListener("click", () => {
        parts = [];
        videoWindow.classList.add("recording");
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000);
        mediaRecorder.ondataavailable = function (e) {
          parts.push(e.data);
        };
      });
    });
};

document.getElementById("stopBtn").addEventListener("click", () => {
  mediaRecorder.stop();
  videoWindow.classList.remove("recording");
  const blob = new Blob(parts, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none;";
  a.href = url;
  a.download = "video_from_web_cam.webm";
  a.click();
});
