import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);
  
  

  
  //addd a note
  const addnote = async(title, description, tag) => {
    props.setProgress(30)
    const url = "http://localhost:5000/api/notes/addnote";
    props.setProgress(60)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },body: JSON.stringify({title,description,tag})
      
     

    });
    const note=await response.json();
    props.setProgress(100)
    setNotes(notes.concat(note))
  //  const json = response.json();
    // const note = {
     
    //   "title": title,
    //   "description": description,
    //   "tag":tag,
    // };
    // const note=json;
    
   
  }
  //get all notes
  const getnote = async() => {
    const url = "http://localhost:5000/api/notes/fetchallnotes";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      // body: JSON.stringify({title,description,tag})
    

    });
    const json=await response.json()
    console.log(json);
    setNotes(json);
   
  }
  // const getnote = async () => {
  //   try {
  //     const url = "http://localhost:5000/api/notes/fetchallnotes";
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': 
  //       }
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch notes');
  //     }
  
  //     const json = await response.json();
  //     setNotes(json); // Update state with fetched notes
  //   } catch (error) {
  //     console.error('Error fetching notes:', error);
  //     // Handle error as needed (e.g., show a message to the user)
  //   }
  // };
  //delete a note
  // const delnote = async (id) => {
  //   console.log("delll" + id)
  //   const url = `http://localhost:5000/api/notes/deletenote/${id}`;
  //   const response = await fetch(url, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': 

  //     }

  //   });
  //   const json=response.json();
  //   console.log(json);
  //   // setNotes(json)
    
  // }
  const delnote = async (id) => {
    try {
      props.setProgress(30)
      const url = `http://localhost:5000/api/notes/deletenote/${id}`;
      props.setProgress(60);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
       
        
      });
      props.setProgress(100);
      props.showalert("Notes deleted successfully","success")
      if (!response.ok) {
         throw new Error('Failed to delete note');

      }
      else{
        
      }
  
      // Filter out the deleted note from the state
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle error as needed (e.g., show a message to the user)
    }
  };

  //edit note
  const editnote = async (id, title, description, tag) => {

    //api ccall
    const url = `http://localhost:5000/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag})

    });
    const json = await response.json();
    console.log(json);
    //
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
    //edit
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    //}
    }
  

  return (
    <noteContext.Provider value={{ notes, addnote, delnote, editnote ,getnote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;