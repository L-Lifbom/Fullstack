import React, { useEffect, useState } from 'react';
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import SignUpIn from "../components/SignUpIn";
import style from "../index.module.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function UserPage() {
    const [signedIn, setSignedIn] = useState(false);
    const [games, setGames] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (signedIn) {
            fetchUserGames();
        }
    }, [signedIn]);

    const fetchUserGames = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/games/user/${localStorage.getItem('userId')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            setGames(response.data);

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setSignedIn(true);
            setEmail(localStorage.getItem('email'));
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

    const handleDeleteGame = async (gameId) => {
        console.log('Does not work xD', gameId);
    }

    return (
        <>
            <Nav />
            <div className={style.userMainContainer}>
                {signedIn ? (
                    <div>
                        <div className={style.userHeader}>
                            <h1>User Profile</h1>
                            <h2>Email: {email}</h2>
                        </div>
                        <ul className={style.userGamesList}>
                            {games && games.length > 0 ? (
                                games.map(game => (
                                    <div key={game.id} className={style.userGamesItem}>
                                        <li>{game.title}</li>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteGame(game.id)}/>
                                    </div>
                                ))
                            ) : (
                                <li>No games found</li>
                            )}
                        </ul>
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