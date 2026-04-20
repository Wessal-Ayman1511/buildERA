import express from 'express'
import bootStrap from './src/app.controller.js'
const app = express()

bootStrap(app, express)

const port = 3000
app.listen(port, () => {
    console.log(`app is running on http://127.0.0.1:${port}`)
})