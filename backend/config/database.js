const mongoose = require('mongoose')


const  connectDatabase =async () =>{
    console.log(process.env.DB_LOCAL_URI)
    await mongoose.connect(process.env.DB_LOCAL_URI, {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(con=> {
        console.log(`MongoDB database connected with host: ${con.connection.host}`)
    }).catch((error)=>{
        console.log("Error:",error)
    })
  
}

module.exports = connectDatabase