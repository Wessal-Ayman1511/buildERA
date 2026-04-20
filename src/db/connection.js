import mongoose from 'mongoose'


const connectDB = async() => {

    await mongoose.connect(process.env.DB_URL)
    .then(() => { console.log("db connected successfully!")})
    .catch((error) => {console.log(" failed to connect to db")})

}

export default connectDB