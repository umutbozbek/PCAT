const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs=require('ejs');
const Photo=require('./models/Photo');
const { emitWarning } = require('process');


const app = express();

//connect mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/pcat-test-db')

//Tamplate ENGINE
app.set("view engine","ejs")




//MİDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Rautes
app.get('/', async (req, res,) => {
  const photos=await Photo.find({})
  res.render('index',{
    photos
  })
})

app.get('/photos/:id', async(req, res,) => {
  // console.log(req.params.id);
  //res.render('about')
  const photo=await Photo.findById(req.params.id)
  res.render('photo',{
    photo
  })
})


app.get('/about', (req, res,) => {
  res.render('about')
})
app.get('/add', (req, res,) => {
  res.render('add')
})

app.post('/photos', async (req, res,) => {
Photo.create(req.body)
  res.redirect('/')
});


const port = 3000

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
})