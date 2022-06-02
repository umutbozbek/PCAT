const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs')
const Photo = require('./models/Photo');



const app = express();

//connect mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/pcat-test-db')

//Tamplate ENGINE
app.set("view engine", "ejs")




//MİDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());

//Rautes
app.get('/', async (req, res,) => {
  const photos = await Photo.find({}).sort('-dateCreated')
  res.render('index', {
    photos
  })
})

app.get('/photos/:id', async (req, res,) => {

  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
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


  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath,
    async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name,
      })
      res.redirect('/')
    })
});


const port = 3000

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
})