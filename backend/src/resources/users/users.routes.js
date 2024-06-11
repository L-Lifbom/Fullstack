import express from 'express';
import { auth } from '../../middleware/auth.js';
import { createUser, updateUser, deleteUser, getUser, loginUser } from './users.controllers.js';

const usersRoutes = express.Router();

usersRoutes.post('/', createUser); // Create a new user
usersRoutes.put('/:id', auth, updateUser); // Update an existing user
usersRoutes.delete('/:id', auth, deleteUser); // Delete a user
usersRoutes.get('/:id', auth, getUser); // Get a user by ID
usersRoutes.post('/login', loginUser); // Login a user

export default usersRoutes;