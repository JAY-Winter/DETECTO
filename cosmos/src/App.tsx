import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import CharacterCounter from './CharacterCounter'
import axios from 'axios'

function App() {
  const lintTest = "린트 테스트를 위한 용도";
  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.data);
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  )
}

export default App