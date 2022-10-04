import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setHtml(await invoke("greet", { markdown }));
  }

  const createMarkdownMarkup = () => ({
    __html: html
  })

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <div>
          <textarea
            id="greet-input"
            onChange={(e) => setMarkdown(e.currentTarget.value)}
          />
          <button type="button" onClick={() => greet()}>
            Convert to HTML
          </button>
        </div>
      </div>
      <div dangerouslySetInnerHTML={createMarkdownMarkup()} />
    </div>
  );
}

export default App;
