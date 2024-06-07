import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('Submitting prompt:', inputText);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Updated model name
          messages: [
            {
              role: 'user',
              content: inputText
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      const data = await response.json();
      console.log('API response:', data);
      setResponse(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Unable to generate response.');
    }
  };

  return (
    <div className="appBody">
      <input 
        type="text" 
        placeholder="Type your prompt here..." 
        value={inputText} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSubmit}>Generate Response</button>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
