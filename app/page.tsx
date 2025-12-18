import { Chat } from "@/app/components/chat";
import "@/styles/chat.css";
export default function Home() {
  return (
    <main className="main">
      <svg
        className="heart1"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.8 4.6c-1.6-1.5-4.1-1.5-5.7 0L12 7.7 8.9 4.6c-1.6-1.5-4.1-1.5-5.7 0-1.7 1.6-1.7 4.2 0 5.8L12 21l8.8-10.6c1.7-1.6 1.7-4.2 0-5.8z" />
      </svg>
      <svg
        className="heart2"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.8 4.6c-1.6-1.5-4.1-1.5-5.7 0L12 7.7 8.9 4.6c-1.6-1.5-4.1-1.5-5.7 0-1.7 1.6-1.7 4.2 0 5.8L12 21l8.8-10.6c1.7-1.6 1.7-4.2 0-5.8z" />
      </svg>

      <h1>Max AI</h1>
      <Chat />
    </main>
  );
}
