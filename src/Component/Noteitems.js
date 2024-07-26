import React, { useContext } from 'react'
import noteContext from '../context-notes/noteContext';
import './styles.css';


const Noteitems = (props) => {
   const context=useContext(noteContext);
    const {delnote} = context;
    const { note,updateNote } = props;


    function formatDate(dateString) {
        // Parse the input date string into a Date object
        const date = new Date(dateString);
      
        // Get the day, month, and year from the Date object
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based index) and pad with leading zero if needed
        const year = date.getFullYear(); // Get full year
      
        // Format the date as dd-mm-yyyy
        const formattedDate = `${day}-${month}-${year}`;
      
        return formattedDate;
      }
    return (
        <>
        <div className='col-md-4' >
            {/* <h2>{note.title}</h2>
            <p>{note.description}</p> */}
            {/* <div className="card my-3 mx-2" style={{width: '18rem'}}>
          
                    <div className="card-body align-items-center">
                    <i className="fa fa-edit mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>{updateNote(note)}}>
                  
                    </i>

                    <i className="fa fa-trash" onClick={()=>{delnote(note._id)}}></i>
                        <h5 className="card-title">{note.title} </h5>
                        <p className="card-text">{note.description}</p>
                       
                        
                    </div>
            </div> */}
            
                <div className=" card" style={{maxWidth:'500px',minHeight:'250px'}}>
                <div className="card-tag"><span className="badge bg-dark p-2" style={{color:'white',width:'100%'}}>{note.tag}</span></div><br/>
                <div className="card-body">
                    
                    <div className="card-title">{note.title}</div>
                    <p className="card-description">
                    {note.description}
                    </p>
                </div>
                <div className="card-footer ">
                
                    
                    <div className="card-tag">{formatDate(note.date)}</div>
                    
                    <div className="card-actions">
                    <button onClick={()=>{updateNote(note)}}><i className="fa fa-edit mx-2" data-toggle="modal" data-target="#exampleModal" >
                  
                  </i></button>
                    <button onClick={()=>{delnote(note._id)}}><i className="fa fa-trash" ></i></button>
                    </div>
                </div>
                </div>
            
        </div>
        </>
    )
}

export default Noteitems
