const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 4000;

let array = []

app.get('/api/data', (req, res) => {
    res.send(array)
})

app.post('/api/additem' , (req, res)=> {
    array.push(req.body)
    res.send({message: "Data send Successfully" , success : true })
})

app.delete(`/delete-item/:id`, (req, res)=>{
    var id = req.params.id

    array = array.filter((e, i) => {
        return e.id !== id
    })

    res.send({message: "Item Deleted!" , success : true })
})



app.patch(`/edit-item/:id`, (req, res)=>{
    var id = req.params.id
    var newObj = req.body

    let selectedIndex = array.findIndex((e, i) => {
        return e.id === id
    })

    console.log(selectedIndex, "....index");
    

    array[selectedIndex] = newObj

    res.send({message: "Item Updated!" , success : true })
})



app.listen(PORT, () => {
  console.log("Server is running");
});
