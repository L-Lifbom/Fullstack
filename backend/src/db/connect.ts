import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()


// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

// export default pool;