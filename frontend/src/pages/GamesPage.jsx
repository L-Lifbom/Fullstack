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
        try {
            const response = await axios.post('http://localhost:3000/games/save', game);
            console.log(response);
        } catch (error) {
            console.error('Error saving game to database:', error);
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