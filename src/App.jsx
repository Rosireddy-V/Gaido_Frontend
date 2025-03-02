import { useState } from 'react';
import axios from 'axios';

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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RAG Chatbot</h1>
          <p className="text-gray-700">Ask me anything about your Health Insurance Policy</p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          {/* Question Input */}
          <div className="mb-6">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full h-32 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
                       placeholder-gray-300"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={askQuestion}
              disabled={loading}
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                loading 
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </span>
              ) : (
                'Ask Question'
              )}
            </button>
          </div>

          {/* Response Section */}
          {response && (
            <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <h2 className="text-lg font-semibold text-white mb-2">Response:</h2>
              <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;