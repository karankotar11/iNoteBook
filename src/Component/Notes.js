import React, { useContext,useEffect ,useState} from 'react'
import noteContext from '../context-notes/noteContext';
import Noteitems from './Noteitems';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getnote,editnote } = context; // Deconstruct all necessary functions from context
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: ""
  });
  let navigate=useNavigate();
  useEffect(() => 
  {
    if(localStorage.getItem('token')){
      getnote()
    }
    else{
      navigate("/login");
    }
    
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
//     const handleclick=(e)=>{
//       e.preventDefault();
      
      
// }
const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
}
const updateNote=(currentNote)=>{
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    console.log(note);
    //props.showalert("feferfwef","Fefe");
   
  


}
const handleclick=(e)=>{
  e.preventDefault();
  props.setProgress(50);
  console.log(note);
  editnote(note.id, note.etitle, note.edescription, note.etag);
  props.showalert("Note edited successfully","Success");
  window.$('#exampleModal').modal('hide');
  props.setProgress(100);
 
  // note.title && addnote(note.title,note.description,note.tag)
    
}
  return (
    <>
    <Addnote showalert={props.showalert} setProgress={props.setProgress}/>
      {/* <!-- Button trigger modal --> */}
     

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <h1>Add Note</h1>
                <div className="form-group">
                    <label htmlFor="title" style={{float:'left'}}>Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" placeholder="Enter email"  onChange={onchange}  minLength={5} required/>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="description" style={{float:'left'}}>Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' placeholder="Description" onChange={onchange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag" style={{float:'left'}}>Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="Tag" onChange={onchange} minLength={5} required/>
                </div>
               
              
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<10?true:false}  className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3 mx-2'>
        {notes.map((note) => {
          // return <div>{note.title}</div>;
          return <Noteitems key={note._id} note={note} updateNote={updateNote} />;

        })}

      </div>
    </>
  )
}

export default Notes
