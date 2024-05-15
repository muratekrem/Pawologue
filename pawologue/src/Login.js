import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'u ekledik
// import io from 'socket.io-client'; // Import Socket.io client

// const socket = io('http://localhost:3001'); // Connect to the server

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook'unu tanımladık

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in successfully!');
      console.log(formData.email);
      // socket.emit('user_login', { email: formData.email });
      
      navigate('/profile', { state: { email: formData.email } }); // Profil sayfasına yönlendirme ve e-postayı ilete
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>PAWOLOGUE</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>E-Mail:</label>
            <input type="email" id="email" name="email" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" name="password" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <button type="submit" style={styles.button}>Login</button>
          </div>
        </form>
        {/* Hata mesajı */}
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.forgotPassword}>
          <a href="#" style={styles.link}>Forgot my password?</a>
        </div>
        <div style={styles.signUp}>
          <p>Don't have an account? <a href="/signup" style={styles.signUpLink}>Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  formContainer: {
    width: '360px',
    padding: '20px',
    backgroundColor: '#f3e5f5',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    color: '#6a1b9a',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '10px',
  },
  title: {
    color: '#6a1b9a',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  label: {
    color: '#6a1b9a',
    marginRight: '10px',
  },
  input: {
    width: '150px',
    padding: '5px', 
    border: '1px solid #6a1b9a',
    borderRadius: '5px',
  },
  forgotPassword: {
    marginBottom: '20px',
    color: '#6a1b9a',
  },
  link: {
    color: '#6a1b9a',
    textDecoration: 'none',
  },
  signUp: {
    color: '#6a1b9a',
  },
  signUpLink: {
    color: '#6a1b9a',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#6a1b9a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    textAlign: 'center',
  },
};

export default Login;
