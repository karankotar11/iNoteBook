import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
    let location = useLocation();
    const navigate=useNavigate();
    const handlelogout=()=>{
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate("/login");
        }

    }
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <div>
           
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="/">Disabled</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token')?<form className="form-inline">
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    {/* <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Login</button>
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Sign up</button> */}
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                    
                </form>:(
                    <button className="btn btn-primary mx-2" onClick={handlelogout}>Log Out</button>
            
                )}
            </nav>
           
        </div> 
    )
}

export default Navbar

