import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index.route'

const app = express()
const router = express.Router()
const port = process.env.PORT || 3006

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(port, () => { console.log(`Server is running: http://127.0.0.1:${port}`) })
