import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

const characters_ls = [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
];

function MyApp() {
      const [characters, setCharacters] = useState([]);
      useEffect(()=> {
        fetchAll().then( result => {
          if (result)
            setCharacters(result);
        })
      }, [] )

  function removeOneCharacter(index){
      const updated = characters.filter((character, i) => {
	 return i !== index });
      setCharacters(updated);
  }	
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )     


 function updateList(person) {
   setCharacters([...characters,person]);
 }

 async function fetchAll(){
   try{
     const response = await axios.get('http://localhost:5000/users')
     return response.data.users_list;
   }
   catch(error){
      console.log(error)
      return false;
   }
 }

}




export default MyApp;
