import React, { useState, useEffect } from 'react';
import fire from './Fire'
import './App.css';

import TestInput from './TestInput';

const testRef = fire.firestore().collection('test');


function App() {

  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  }

  const handleSubmit = e => {
    testRef.doc().set({ text: text });
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await testRef.orderBy('text').get();
      setList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <h1>Map of Canada</h1>
      <h2>By Albatrooss</h2>

      <ul>
        {list.map(item => (
          <TestInput item={item} />
        ))}
      </ul>

      <input type="text" id='text' onChange={handleChange}></input>
      <br />
      <button onClick={handleSubmit} >Submit</button>
    </div>
  );
}

export default App;
