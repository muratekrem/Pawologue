import React from 'react';

function Login() {
  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>PAWOLOGUE</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input type="text" id="username" name="username" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input type="password" id="password" name="password" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <button style={styles.button}>Login</button>
        </div>
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
};

export default Login;
