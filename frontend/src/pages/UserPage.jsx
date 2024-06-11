import React, { useEffect, useState } from 'react';
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import SignUpIn from "../components/SignUpIn";
import style from "../index.module.css";
import axios from 'axios';

function UserPage() {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setSignedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setSignedIn(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            try {
                const response = await axios.delete(`http://localhost:3000/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    handleLogout();
                }
            } catch (error) {
                console.error('Failed to delete account:', error);
            }
        }
    }

    return (
        <>
            <Nav />
            <div className={style.userMainContainer}>
                {signedIn ? (
                    <div>
                        <h1>User Profile</h1>
                        <button onClick={handleLogout}>Log Out</button>
                        <button onClick={handleDelete}>Delete Account</button>
                    </div>
                ) : (
                    <SignUpIn onSignIn={() => setSignedIn(true)} />
                )}
            </div>
            <Footer />
        </>
    );
}

export default UserPage;