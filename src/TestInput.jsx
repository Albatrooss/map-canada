import React, { useState } from 'react'
import fire from './Fire'
const db = fire.firestore();

export default function TestInput({ item }) {

  const [value, setValue] = useState(item.text);

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleUpdate = () => {
    db.collection('test').doc(item.id).set({ text: value })
  }

  return (
    <li>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </li>
  )
}
