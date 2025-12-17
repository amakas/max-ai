"use client";
import { useState, useEffect, useRef } from "react";
type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const lastRef = useRef<null | HTMLDivElement>(null);
  const handleClick = async () => {
    if (!text) return;
    setLoading(true);
    const message: Message = {
      role: "user",
      content: text,
    };
    setMessages((prev) => {
      return [...prev, message];
    });
    setText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, message] }),
      });
      if (!res.ok) throw new Error("Request failed");
      const aiMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, aiMessage]);
      const reader = res.body?.getReader();
      let done = false;
      let content = "";
      while (!done) {
        const { value, done: readerDone } = await reader!.read();
        done = readerDone;
        if (value) {
          let chunk = new TextDecoder().decode(value);
          for (const char of chunk) {
            content += char;

            setMessages((prev) => {
              const last = [...prev];
              last[last.length - 1] = {
                ...last[last.length - 1],
                content,
                role: "assistant",
              };
              return last;
            });
            await new Promise((res) => setTimeout(res, 20));
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {}, []);
  return (
    <div className="chat">
      <div className="messages-container">
        {messages.length === 0 && <h2>How can i help you today?</h2>}
        {messages?.map((message, i) => {
          return (
            <div key={i} className="message-container">
              {message.role === "user" ? (
                <div className="my message">
                  {" "}
                  <p className="content">{message.content}</p>
                </div>
              ) : (
                <div className="ai message">
                  <p className="content"> {message.content}</p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={lastRef}> </div>
      </div>

      <form
        className="input-send"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <input
          className="input"
          placeholder="Your message..."
          disabled={loading ? true : false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoCapitalize="true"
          autoComplete="true"
          autoFocus
        ></input>
        <button disabled={loading ? true : false} className="send-button">
          ➤
        </button>
      </form>
    </div>
  );
};
