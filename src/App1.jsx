import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("https://gaido-chatbot-backend.onrender.com/query", { question });
      setResponse(res.data.answer);
    } catch (error) {
      setResponse("Error fetching response.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
     <div className="container">
       <h1>RAG Chatbot</h1>
       <textarea
         value={question}
         onChange={(e) => setQuestion(e.target.value)}
         placeholder="Ask a question..."
       />
       <button onClick={askQuestion} disabled={loading}>
         {loading ? "Thinking..." : "Ask"}
       </button>
       {response && <p><strong>Response:</strong> {response}</p>}
     </div>
      
    </>
  )
}

export default App
