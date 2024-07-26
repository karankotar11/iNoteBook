// import logo from './logo.svg';
import './App.css';
import About from './Component/About';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



import NoteState from './context-notes/NoteState';
import Notes from './Component/Notes';
import Alert from './Component/Alert';
import { useState } from 'react';

import LoadingBar from 'react-top-loading-bar';
import Login from './Component/Login';
import Signup from './Component/Signup';






function App() {
 
  const [alert, setalert] = useState(null);

  const [progress, setProgress] = useState(0)



  const showalert=(msg,type)=>{
    setalert({
      msg:msg,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },2000);
  }

  return (
    <>
     <NoteState showalert={showalert} setProgress={setProgress}>
        <Router>
          <div className="App">
          <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
       
      />
     
          <Navbar />
          <Alert alert={alert}/>
        
            
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert} setProgress={setProgress}/>} />
              <Route exact path="/about" element={<About setProgress={setProgress} />} />
              <Route exact path="/notes" element={<Notes showalert={showalert} setProgress={setProgress}/>} />
              <Route exact path="/login" element={<Login showalert={showalert} setProgress={setProgress} />} />
              <Route exact path="/signup" element={<Signup showalert={showalert} setProgress={setProgress}/>} />
            </Routes>
          </div>
        </Router>
        </NoteState>
    </>
  );
}

export default App;
