const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/userDetails").then(()=>{
    console.log("Connecting to the database")
})
.catch((error)=>{
    console.log("data base is not connected" , error)
});



