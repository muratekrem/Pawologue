import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";

function Profile() {
    const [email, setEmail] = useState("");
    const location = useLocation();
    
    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    return (
        <div>
             <Navbar />
            <div style={{display:"flex" , justifyContent:"space-around" }}>
                <div style={{border: "2px dotted black", width:"30%" , marginTop:"100px ", height:"40vh"}}>
                    <h2 style={{display:"flex", justifyContent:"center" , borderBottom:"2px dotted"}}>Profile Information</h2>
                    <div style={{justifyContent:"center", marginLeft:"5px"}}>
                    <p>Email: {email}</p>
                    <p>Name: </p>
                    <p>Surname: </p>
                    <p>Phone Number: </p>
                    <p>Birthday: </p>
                    </div>
                    
                </div>
                <div style={{border: "2px dotted black", width:"30%" , marginTop:"100px ", height:"60vh"}}>
                    <h2 style={{display:"flex", justifyContent:"center" , borderBottom:"2px dotted"}}>Chat </h2>
                    <div style={{justifyContent:"center", marginLeft:"5px"}}>
                   
                    
                    </div>
                    
                </div>
            </div>
        
        </div>
        
    );
}

export default Profile;