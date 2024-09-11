const express = require ('express');
const  connectDB = require('./config/db.js');


const app = express();
const PORT=process.env.PORT || 5001

app.use(express.json())

app.use("/api/auth",require("./routes/authRoutes.js"))

app.listen(PORT,()=>{
    connectDB();
console.log("server running on port ", PORT);
})

//Cb2DrRBLoRNwjEfb

