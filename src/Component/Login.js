import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";





const Login = (props) => {
    const [logindata, setlogindata] = useState({
        email:'',
        password:''
    });
   
   const [token, settoken] = useState(null);
   let navigate=useNavigate();
   
    const handleSubmit=async (e)=>{
        props.setProgress(30);
        e.preventDefault();
        // fetch("http://localhost:5000/api/auth/login")
        const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:logindata.email,password:logindata.password})
      
   
    });
    props.setProgress(70);
      const json=await response.json();
      console.log("username:"+logindata.email)
      console.log(json);
      if(json.success)
      {
        //redirect
        // settoken(json.authortoken);
        // alert(token);
        props.showalert("Login Successfullll...","Success.");
        localStorage.setItem('token',json.authortoken)
        navigate("/")
      }
      else
      {
        props.showalert("Password not match","Failure!")
      }
      props.setProgress(100);
      
    }
    const onchange=(e)=>{
        setlogindata({...logindata,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <h2 className="text-center mt-5">Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                      
                        <input type="email" className="form-control p-2 my-4" id="email" onChange={onchange} value={logindata.email} name='email' placeholder="Email-ID" required/>
                    </div>
                    <div className="form-group">
                        
                        <input type="password" className="form-control p-2 my-4" id="password" autoComplete='password' onChange={onchange} value={logindata.password} name='password' placeholder="Password" required/>
                    </div>
                   
                    <button type="submit" className="btn btn-primary btn-block" >Login</button>
                    {/* <h6>{token}</h6> */}
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login
