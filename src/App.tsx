import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [refreshCheck, setRefreshCheck] = useState(false);

  async function greet() {
    setRefreshCheck(true);
  }

  useEffect(() => {

    const parseMarkdown = async () => {
      setHtml(await invoke("greet", { markdown }));
      setRefreshCheck(false);
      console.log('new markdown');
    }
    console.log ('refreshed')
    if(refreshCheck) {
      parseMarkdown()
      console.log ('parsing!')
    }
  }, [refreshCheck])

  const createMarkdownMarkup = () => ({
    __html: html
  })

  const handleTextArea = (e) => {
    setMarkdown(e.currentTarget.value)
    setRefreshCheck(true);
      console.log('need new markdown!');
  };

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
            onChange={handleTextArea}
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
