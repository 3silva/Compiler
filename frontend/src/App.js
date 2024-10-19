import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');

  const handleSet = async () => {
    try {
      const res = await axios.post('http://localhost:3000/set', { key, value });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse('Erro ao definir o valor.');
    }
  };

  const handleGet = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/get/${key}`);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse('Erro ao buscar o valor.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSet} style={{ marginRight: '10px' }}>Set Value</button>
        <button onClick={handleGet}>Get Value</button>
      </div>
      {response && <p style={{ marginTop: '20px' }}>{response}</p>}
    </div>
  );
}

export default App;