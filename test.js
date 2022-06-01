const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//connect DB

mongoose.connect('mongodb://0.0.0.0:27017/pcat-test-db')


//create schema

const PhotoSchema = new Schema({
    title: String,
    description: String,
})

const Photo = mongoose.model('Photo', PhotoSchema)

//create a photo

// Photo.create({
//     title: "Photo title 2 ",
//     description: "photo 2 description lorem ipsum "
// })


// read a photo

// Photo.find({},(err,data)=>{
//     console.log(data);
// })


//UPDATE PHOTO

// const id= "62977e68bdd4be0300c5629d"

// Photo.findByIdAndUpdate(
//     id,
//      {
//         title:"Photo title update 111 ",
//         description:"photo 111 description update"
//     },
//     {
//         new:true
//     },
//     (err,data) => {
//         console.log(data);
//     }
// )


// DELETE PHOTO
const id = '62977ed6a86d1e35603fd6d7'

Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo is removed');
})