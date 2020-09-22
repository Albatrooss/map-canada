import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import firebase from './Fire';

const mapsRef = firebase.firestore().collection('maps');

export function Map() {

  const { id } = useParams();

  const [mapData, setmapData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      const data = await mapsRef.doc(id).get();
      setmapData(data.data());
    }
    fetchData();
  }, [])
  console.log(mapData);
  return (
    <div>
      <h1>{mapData.name}</h1>
      <ul>
        <li>{mapData.teacherName}</li>
        <li>{mapData.students}</li>
      </ul>
    </div>
  )
}

export function Teacher() {
  const history = useHistory();
  const [mapName, setMapName] = useState('');

  const createMap = () => {
    mapsRef.doc(mapName).set(defaultMapData(mapName));
    console.log('please')
    history.push(`/${mapName}`);
  }

  useEffect(() => {
    const setDefaultName = async () => {
      let name = await defaultName();
      setMapName(name);
    }
    setDefaultName();
  }, [])

  return (
    <>
      <h1>Welcom to Canadian Map Builder!!</h1>
      <h2>Create your map here</h2>
      <input type="text" value={mapName} onChange={e => setMapName(e.target.value)} />
      <button onClick={createMap}>Create Map</button>
    </>
  )
}

async function defaultName() {
  let name = getRandom();
  let taken = await mapsRef.doc(name).get();

  //Checks to see if the name is taken, if it is, will generate a new random name

  while (taken.data()) {
    name = getRandom();
    taken = await mapsRef.doc(name).get();
    console.log(name);
  }

  function getRandom() {
    let name = '';
    for (let i = 0; i < 7; i++) {
      name += Math.floor(Math.random() * 10);
    }
    return name;
  }

  //Once it finds an unused name, returns
  return name;
}

function defaultMapData(name) {
  return {
    name,
    teacherName: '',
    students: [],
    provinces: [],
    regions: []
  }
}