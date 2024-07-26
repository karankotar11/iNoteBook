import React, { useContext, useState } from 'react'
import noteContext from '../context-notes/noteContext';



const Addnote = (props) => {
    const context = useContext(noteContext);
    const [title_warning, settitle_warning] = useState(null)
  const {addnote } = context;
  const [note, setNote] = useState({title:'',description:"",tag:""})

  const handleclick=(e)=>{
    props.setProgress(30);
        e.preventDefault();
        note.title && note.tag && addnote(note.title,note.description,note.tag)
        note.title && note.tag && props.showalert("Note added successfully...","Success");
        props.setProgress(100); 
        setNote({title:'',description:"",tag:""});

        
  }
  const onchange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({ ...prevNote, [name]: value }));
    
    // Check if the title length is less than 5 characters
    if (name === 'title' && value.length < 5) {
        // console.log('hiii');
        settitle_warning("Title must be 5 Character long")
    }
    if (name === 'title' && value.length > 4) {
        // console.log('hiii');
        settitle_warning('')
    }
};
  return (
    <div>
       <div className="container my-3">
            <form>
                <h1>Add Note</h1>
                <div className="form-group">
                    <label htmlFor="title" className='mx-2 my-2' style={{float:'left'}}>Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" placeholder="Enter Title"  onChange={onchange}  minLength={5} required/>
                    {/* <label className='my-1'  style={{float:'left',color:'red'}}>{title_warning}</label> */}
                    <h6 style={{float:'left',color:'red'}}>{title_warning}</h6><br/>
                </div>
                <div className="form-group">
                    <label htmlFor="description"  className='mx-2 my-2' style={{float:'left'}}>Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' placeholder="Description" onChange={onchange}  minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag" className='mx-2'style={{float:'left'}}>Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' placeholder="Tag" onChange={onchange}  minLength={5} required/>
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleclick} disabled={note.title.length<5 || note.description.length<10?true:false}>Add Note</button>
            </form>
        </div>

    </div>
  )
}

export default Addnote
