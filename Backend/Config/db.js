import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const server = process.env.MONGODB_URI; 
const database = 'employee-management'; 

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
         console.log(err)
       })
  }
}

export default Database;