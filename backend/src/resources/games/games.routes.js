import express from 'express';
import { fetchGames, saveUserGame } from './games.controllers.js';

const gamesRoutes = express.Router();

gamesRoutes.get('/fetch', fetchGames); // Route to fetch games from external API
gamesRoutes.post('/save', saveUserGame); // Route to save a game to a user's profile

export default gamesRoutes;

