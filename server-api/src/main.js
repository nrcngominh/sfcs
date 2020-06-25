import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import SocketIO from 'socket.io'
import BaseSocket from './sockets'
import BaseRouter from './api/routers'

const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`
console.log(mongoUri)

// Connect to MongoDB
const connectWithRetry = () => {
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true},
  (err) => {
    if (err) {
      console.error('Failed to connect to MongoDB on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, 5000)
    }
  })
}
connectWithRetry()
console.log('Connected to database')

// Setup server
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port', server.address().port)
})

// Create socket for server
const io = SocketIO.listen(server)
BaseSocket.initial(io)

// Routing for API
app.use('/api', BaseRouter)

