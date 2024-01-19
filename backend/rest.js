const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RecordEntryModel = require('./entry-schema');
const app = express();
mongoose.connect("mongodb+srv://panji:mymongodbpassword@testcluster1.hklllll.mongodb.net/recorddb?retryWrites=true&w=majority").then(()=> {
    console.log('Connected to MongoDB');
})
.catch(() => {
   console.log('Failed to connect to MongoDB');
});


app.use(bodyParser.json());


app.post('/add-entry',(req,res) => {
    const recordEntry = new RecordEntryModel({day:req.body.day, workout_sts:req.body.workout_sts});
    recordEntry.save();
    // console.log(recordEntry);
    // recordEntries.push({id: req.body.id, day: req.body.day, workout_sts: req.body.workout_sts});
    res.status(200).json({
       message: 'Post submitted'
    });
});

app.use((req,res,next) => {
  res.setHeader('Access-ControlAllow-Origin','*');  //TO see domain access
  res.setHeader('Access-ControlAllow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-ControlAllow-Methods','GET, POST, PUT, OPTIONS');  //Methods supported
  next();
});

app.put('update-entry/:id',(req,res) => {
    const updatedEntry = new RecordEntryModel({_id: req.body.id, day: req.body.day, workout_sts: req.body.workout_sts});
    RecordEntryModel.updateOne({_id:req.body.id}, updatedEntry)
    .then(() => {
        res.status(200).json({
            message: 'Updated'
        }) 

    })
    
})


app.get('/records-entries', (req,res, next) => {
    RecordEntryModel.find()
    .then((data) => {
        res.json({'recordEntries': data});
    })
    .catch(() => {
        console.log('Error Fetching Entries');
    })
    
    
  

});

module.exports = app;