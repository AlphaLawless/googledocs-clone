import { createServer } from "http";
import { Server } from "socket.io";
import Document from "./models/Document";
import dbConnect from "./database/dbconnect";

const { ORIGIN_CORS, PORT } = process.env;

if (!ORIGIN_CORS || !PORT) {
  throw new Error(
    "Please define ORIGIN_CORS or PORT environment variable inside .env!"
  );
}

dbConnect();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: `${ORIGIN_CORS}`,
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id: number) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

httpServer.listen(PORT || 3001);
