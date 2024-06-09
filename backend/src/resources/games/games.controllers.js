import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const fetchGames = async (req, res) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const saveUserGame = async (req, res) => {
    const { userId, gameId, title, description } = req.body;
    try {
        const newGame = await prisma.game.create({
            data: {
                title,
                description,
                users: {
                    connect: { id: userId }
                }
            }
        });
        const newUserGame = await prisma.userGame.create({
            data: {
                userId,
                gameId: newGame.id
            }
        });
        res.status(201).json({ game: newGame, userGame: newUserGame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
