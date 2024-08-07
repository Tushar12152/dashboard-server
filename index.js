const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5005
require('dotenv').config()


app.use(cors())
app.use(express.json())








app.get('/',(req,res)=>{
    res.send('dashboard-server is running....')
})



app.listen(port, () => {
  console.log(`This server is going on port : ${port}`)
})