import dotenv from 'dotenv'
import express from'express'
import mongoose from 'mongoose'

dotenv.config();
const app = express()

app.use(express.json())