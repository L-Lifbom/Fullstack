import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import style from "../index.module.css";

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

    return (
        <>
            <Nav />
            <div className={style.gamesMainContainer}>
                {games.map((game) => (
                    <div key={game.id} className={style.gameCard}>
                        <h1>{game.name}</h1>
                        <img src={game.background_image} alt={game.name} />
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default GamesPage;