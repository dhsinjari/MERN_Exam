const express  = require('express')
const cors  = require('cors')
const dotenv  = require('dotenv')
const petRoutes = require('./routes/petRoutes')
dotenv.config()
const {connectDB} = require('./config/mongoose.config')

connectDB()
const app = express()
app.use(cors('*'))
app.use(express.json())
app.use("/pets", petRoutes)

const PORT = 5000;
app.listen(PORT, ()=>console.log('Server listening on port  ' + PORT))