import React from 'react'
// import { useContext } from 'react'
// import noteContext from '../context-notes/noteContext';
import Notes from './Notes';




const Home = (props) => {
    
  
    return (
        <>  
       
           
            <Notes showalert={props.showalert} setProgress={props.setProgress}/>
            

       
        </>
    )
}

export default Home

