import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import style from "../index.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function GamesPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:3000/games/fetch');
            setGames(response.data.results);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };
    const saveGameToDatabase = async (game) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to save games.');
            return;
        }
        const userId = parseInt(localStorage.getItem('userId'));
        if (!userId) {
            console.error('User ID is null');
            return;
        }
        try {
            const gameData = {
                userId,
                gameId: game.id,
                title: game.name,
                description: game.description
            };
            console.log('Token:', token);
            console.log('Game Data:', gameData);
            const response = await axios.post('http://localhost:3000/games/save', gameData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error saving game to database:', error.response ? error.response.data : error);
        }
    };

    return (
        <>
            <Nav />
            <div className={style.gamesMainContainer}>
                {games.map((game) => (
                    <div key={game.id} className={style.gameCard}>
                        <h1>{game.name}</h1>
                        <img src={game.background_image} alt={game.name} />
                        <FontAwesomeIcon icon={faStar} onClick={() => saveGameToDatabase(game)}/>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default GamesPage;