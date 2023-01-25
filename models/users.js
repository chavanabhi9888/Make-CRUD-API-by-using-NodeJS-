const mongoose =require('mongoose');
const bcrypt = require("bcrypt");
const mongoose_delete = require('mongoose-delete');


const userschemas= new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter your name',
        isDeleted: { type: Boolean, defaults: true }
    },
    email: {
        type: String,
        unique:true,
        required: 'Please enter your email',
        isDeleted: { type: Boolean, defaults: true }

    },
    password: {
        type: String,
        required: true
    },
    contact:{
        type:Number,
    },
    DateOfBirth:{
        type: String,
       
    },
    address:{
        type:String,
       
    }

},
{ timestamps:true }
)

userschemas.pre("save", async function(next) {
    try{
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    }catch (error){
    next(error)
    }
})

userschemas.plugin(mongoose_delete, { deletedAt : true });


userschemas.pre("deleteOne",function() {
    this.where({ isDeleted: false });
});
// userschemas.plugin(softDelete)
module.exports = mongoose.model('User', userschemas)




