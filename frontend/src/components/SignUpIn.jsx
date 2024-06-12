import axios from 'axios';
import React, { useState } from 'react';
import styles from '../index.module.css';

function SignUpIn( { onSignIn }) {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');

  const handleToggle = () => {
    setSignUp(!signUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/users/', { email: email.toLowerCase(), password });
      console.log('User created:', response.data);
      setUserId(response.data.id);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, { email: email.toLowerCase(), password });
      if (response.data && response.data.user) {
        console.log('Login successful:', response.data);
        console.log('Token:', response.data.token);
        console.log('User ID:', response.data.user.id);
        console.log('User Email:', response.data.user.email);
        localStorage.setItem('token', response.data.token); // Store token in local storage
        localStorage.setItem('userId', response.data.user.id); // Store userId in local storage
        localStorage.setItem('email', response.data.user.email); // Store email in local storage
        onSignIn();
      } else {
        alert('Login failed: Invalid credentials.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error during login:', error.response.data);
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        console.error('Error during login:', error.message);
        alert('Login failed: Network error or server is down.');
      }
    }
  };

  return (
    <div className={styles.signContainer}>
      <h1>{signUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={signUp ? handleSignUp : handleSignIn} className={styles.signForm}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {signUp && (
          <>
            <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </>
        )}
        <button type="submit">{signUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={handleToggle}>
        {signUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default SignUpIn;