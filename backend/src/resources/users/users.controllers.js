import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { email, password: hashedPassword }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};