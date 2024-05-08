import React, { useState } from 'react';
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // useHistory yerine useNavigate kullanıyoruz

function Signup({ onSignup }) {
  const navigate = useNavigate(); // useNavigate kancasını kullanarak tarayıcı geçişini yönetebiliriz

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    phoneNumber: '+90',
    birthday: ''
  });

  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Kayıt başarılı olduğunda görüntülenecek mesaj

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      if (value.startsWith('+90')) {
        setFormData({
          ...formData,
          [name]: value
        });
      } else if (value === '+') {
        setFormData({
          ...formData,
          [name]: value
        });
      } else if (value.match(/^\+90\d{0,10}$/)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Kullanıcı verilerini Firestore'a gönderme
      const res = await fetch("https://pawologue-default-rtdb.firebaseio.com/UserData.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          surname: formData.surname,
          phoneNumber: formData.phoneNumber,
          birthday: formData.birthday
        })
        
      });
      if(res){
        console.log("Message sent to database")
    } else {
        console.log("Message didn't send. Error!")
    }
  
      // Başarılı kayıt durumunda, burada setUserName veya benzeri bir fonksiyonla kullanıcı adını navbar'a iletilebilir
      if (onSignup) {
        onSignup(formData.name);
      }
      console.log('User registered successfully!');
  
      // Kayıt başarılı olduğunda successMessage state'ini güncelle
      setSuccessMessage('Your registration to the system has been successfully created.');
  
      // Başarılı kayıt durumunda anasayfaya yönlendirme işlemi
      setTimeout(() => {
        navigate('/login'); // Anasayfaya yönlendirme
      }, 3000); // 3 saniye sonra yönlendirme yapılacak
    } catch (error) {
      setError(error.message);
    }
  };
  

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+90\d{10}$/;
    return regex.test(phoneNumber);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>PAWOLOGUE</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>
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
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Name:</label>
            <input type="text" id="name" name="name" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="surname" style={styles.label}>Surname:</label>
            <input type="text" id="surname" name="surname" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" style={styles.input} onChange={handleChange} value={formData.phoneNumber} required />
            {phoneNumberError && <span style={styles.error}>Please enter a valid phone number starting with +90 and containing exactly 10 digits.</span>}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="birthday" style={styles.label}>Birthday:</label>
            <input type="date" id="birthday" name="birthday" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.signUp}>
            <button type="submit" style={styles.button}>Sign Up</button>
          </div>
        </form>
      </div>
      {/* Kayıt başarılı olduğunda görüntülenecek mesaj */}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {/* Hata mesajı */}
      {error && <p style={styles.error}>{error}</p>}
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
    width: '400px',
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
    marginBottom: '20px',
  },
  title: {
    color: '#6a1b9a',
    marginBottom: '30px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  label: {
    color: '#6a1b9a',
    marginRight: '10px',
    minWidth: '120px',
    textAlign: 'left', 
  },
  input: {
    flex: '1',
    padding: '10px',
    border: '1px solid #6a1b9a',
    borderRadius: '5px',
    maxWidth: '200px',
  },
  signUp: {
    marginBottom: '20px',
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
    textAlign: 'left',
    marginLeft: '130px', 
  },
  successMessage: {
    color: 'green',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default Signup;
