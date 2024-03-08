import React from "react";


function App() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button>
          Sign in
        </button>
        <button>
          Sign up
        </button>
      </div>
      <div style={{display:"flex", alignContent:"center",justifyContent:"center"}}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10312.425341935903!2d30.517380395490452!3d39.78674569721603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc15e397ff02e5%3A0xc7c4c24413b5af1a!2sEspark%20Shopping%20Mall!5e0!3m2!1sen!2str!4v1709916751166!5m2!1sen!2str" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
    </div>
    </div>
    
  );
}

export default App;
