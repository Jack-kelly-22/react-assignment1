import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';



function MyApp() {
  const [characters, setCharacters] = useState([]);
  useEffect(()=> {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    })
  }, [] )

  function removeOneCharacter(index){
    console.log("here",characters[index].id)
      axios.delete("http://localhost:5000/users/" +characters[index].id)
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



async function makePostCall(person){
 try {
    const response = await axios.post('http://localhost:5000/users', person);
    return response;
 }
 catch(error) {
    console.log(error);
    return false;
 }
}

function updateList(person){
  makePostCall(person).then( result =>{
    if(result.status === 201){
      person.id= result.data.id;
      setCharacters([...characters,person]);
    }
  });
}
 
}
export default MyApp;
