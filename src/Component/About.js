import React from 'react';
import { useContext } from 'react';
import noteContext from '../context-notes/noteContext';



const About = (props) => {
    const a=useContext(noteContext);
    {props.setProgress(100)}
  return (
    <div>
      this is About
      
    </div>
  )
}

export default About
