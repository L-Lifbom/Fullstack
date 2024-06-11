import express from 'express';
import { fetchGames, saveUserGame } from './games.controllers.js';
import { auth } from '../../middleware/auth.js';

const gamesRoutes = express.Router();

gamesRoutes.get('/fetch', fetchGames); // Open to everyone
gamesRoutes.post('/save', auth, saveUserGame); // Restricted to logged-in users

export default gamesRoutes;
