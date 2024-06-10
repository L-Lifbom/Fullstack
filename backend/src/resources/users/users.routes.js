import express from 'express';
import { createUser, updateUser, deleteUser, getUser, loginUser } from './users.controllers.js';

const usersRoutes = express.Router();

usersRoutes.post('/', createUser); // Create a new user
usersRoutes.put('/:id', updateUser); // Update an existing user
usersRoutes.delete('/:id', deleteUser); // Delete a user
usersRoutes.get('/:id', getUser); // Get a user by ID
usersRoutes.post('/login', loginUser); // Login a user

export default usersRoutes;