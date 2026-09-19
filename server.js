const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const easyrtc = require("open-easyrtc");
const cors = require("cors");

const app = express();
app.use(cors());

// Ruta base para verificar que el servidor está vivo y permitir el ping de calentamiento
app.get("/", (req, res) => {
  res.send("Servidor de Señalización WebRTC del Museo Virtual UMSA - Activo");
});

const webServer = http.createServer(app);

// Iniciar Socket.io
const socketServer = socketio.listen(webServer, { "log level": 1 });

easyrtc.setOption("logLevel", "warning");

// Iniciar Open-EasyRTC
easyrtc.listen(app, socketServer, null, (err, rtcRef) => {
  if (err) {
    console.error("Error iniciando EasyRTC:", err);
    return;
  }
  console.log("Servidor EasyRTC iniciado con éxito.");
});

// Render asigna dinámicamente el puerto en process.env.PORT
const port = process.env.PORT || 8080;
webServer.listen(port, () => {
  console.log(`Servidor de señalización escuchando en el puerto ${port}`);
});
