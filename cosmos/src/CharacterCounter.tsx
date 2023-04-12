import React from 'react'
import TextInput from './TextInput';
import CharacterCount from './CharacterCount';

function CharacterCounter() {
  return (
    <div>
      <CharacterCount />
      <TextInput />
    </div>
  );
}


export default CharacterCounter