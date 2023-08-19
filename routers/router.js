const express = require('express');
const router = express.Router();
const todoData=require("../model/schema");
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Add TodoList
router.post('/addtodolist', async (req,res)=>{                              
    try{
        const item = req.body;                                               
        const newdata = await todoData(item);                               
        newdata.save();                                
        res.status(200).json("TodoList Added");    
        console.log(` TodoList Added`);                                                                         
    }catch(error){
        res.status(400).json("Cannot Add data");                            
        console.log(`Cannot Add data`);                                      
    }
})

// get the todoList
router.get('/todolist', (req, res) => {
    todoData.find()
      .then((todolist) => {
        res.json(todolist);
      })
      .catch((error) => {
        console.error('Error retrieving todoList:', error);
        res.status(500).send('Error retrieving todoList');
      });
  });

  router.get('/get-todoListDetails/:id', (req, res) => {
    const id = req.params.id;
  
    todoData.findById(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ error: 'Data not found' });
        }
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving data' });
      });
  });

//   delete todoList
  router.delete('/delete-todolist/:id', (req, res) => {
    const id = req.params.id;
  
    todoData.findByIdAndRemove(id)
      .then((removedData) => {
        if (removedData) {
          console.log('todoList deleted successfully:', removedData);
          res.json({ message: 'todoList deleted successfully' });
        } else {
          res.status(404).json({ error: 'todoList not found' });
        }
      })
      .catch((err) => {
        console.error('Error deleting todoList:', err);
        res.status(500).json({ error: 'Error deleting todoList' });
      });
  });
module.exports = router