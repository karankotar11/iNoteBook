
// const mongoose=require('mongoose');
import mongoose from 'mongoose';

const mongoURI="mongodb+srv://karankotar11:67B0dLWuu027xfTU@karan.ezthbnv.mongodb.net/iNoteBook";
//const mongoURI="mongodb://localhost:27017/iNoteBook";

const connectToMongo=async ()=>{
    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(mongoURI)
        console.log('mongo connected')
    }
   catch{
    console.log(error)
    process.exit()
   }
}
module.exports=connectToMongo;