import { Chat } from "@/app/components/chat";
import "@/styles/chat.css";
export default function Home() {
  return (
    <main className="main">
      <h1>Max AI</h1>
      <Chat />
    </main>
  );
}
