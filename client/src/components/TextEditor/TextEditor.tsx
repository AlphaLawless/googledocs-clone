import Quill, { TextChangeHandler } from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

import "./TextEditor.scss";

const OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    const socketCon = io("http://localhost:3001");
    setSocket(socketCon);

    return () => {
      socketCon.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = (delta) => {
      quill.updateContents(delta);
    };

    socket?.on("receive-changes", handler);

    return () => {
      socket?.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = (delta, oldDelta, Sources) => {
      if (Sources !== "user") return;
      socket?.emit("send-changes", delta);
    };

    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: OPTIONS },
    });
    quill.enable(false);
    quill.setText("Loading...");
    setQuill(quill);
  }, []);

  return <div ref={wrapperRef}></div>;
};

export default TextEditor;
