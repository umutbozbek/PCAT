const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')

const ejs = require('ejs');

const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')


const app = express();

//connect mongoDb
mongoose.connect('mongodb://0.0.0.0:27017/pcat-test-db', {


})

//Tamplate ENGINE
app.set("view engine", "ejs")




//MİDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))


//Rautes
app.get('/', photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto)
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)


app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)

const port = 3000

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
})