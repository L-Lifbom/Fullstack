import React, { useState } from 'react';
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import SignUpIn from "../components/SignUpIn"; // Import SignUpIn component
import style from "../index.module.css";

function UserPage() {
    const [signedIn, setSignedIn] = useState(false); // State to track sign-in status

    const handleLogout = () => {
        setSignedIn(false); // Logic to handle logout
    };

    return (
        <>
            <Nav />
            <div className={style.userMainContainer}>
                {signedIn ? (
                    <div>
                        <h1>User Profile</h1>
                        <button onClick={handleLogout}>Log Out</button>
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