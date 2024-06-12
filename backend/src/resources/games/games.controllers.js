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
        let game = await prisma.game.findUnique({
            where: { id: gameId }
        });

        if (!game) {
            game = await prisma.game.create({
                data: { title, description }
            });
        }

        const userGame = await prisma.userGame.create({
            data: {
                userId,
                gameId: game.id
            }
        });
        res.status(201).json({ game, userGame });
    } catch (error) {
        console.error('Save game error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const fetchUserGames = async (req, res) => {
    const { userId } = req.params;
    try {
        const userGames = await prisma.userGame.findMany({
            where: { userId: parseInt(userId) },
            include: { game: true }
        });
        res.json(userGames.map(ug => ug.game));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};