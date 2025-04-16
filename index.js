const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 4000;

const array = []

app.get('/api/data', (req, res) => {
    res.send(array)
})

app.post('/api/additem' , (req, res)=> {
    array.push(req.body)
    res.send({message: "Data send Successfully" , success : true })
})

app.listen(PORT, () => {
  console.log("Server is running");
});
