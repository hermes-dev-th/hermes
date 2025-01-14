const express = require('express')
const app = express()

const port = 8000

app.get('/', (req ,res) =>{
    res.send("Hello Hermes")
})

app.listen(port , (req , res) =>{
    console.log(`Server start at http://localhost:${port}`);
})
