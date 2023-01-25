const express =  require("express");
const router = express.Router()
const user = require("../models/users");


router.get("/readuser", async (req , res) =>{
    try{
        let data = await user.find()
        if (!data){
            res.status(404).json({error:"No Record Found, Please add User"})
        }
        else{
            res.status(500).json({"All Record  ":data})
        }

    }catch(err){
        res.status(500).send('error getting in GET API'  , err)
    }
});
 




router.post('/registeruser', async (req , res) =>{
    try{
        console.log(req.body.email);
        userExist =  await user.findOne({"email":req.body.email})
        console.log(userExist);
        if (userExist){
            return res.status(422).json({error : "Email Already Exists !"});
        }
        else{
            // console.log(req.body)
            const register_user = new user(req.body);
            // console.log(register_user)
            const data = await register_user.save();
            // console.log(data)
            res.json({
                "data":data,
                "msg" : "Data is uploaded sucessfully"
            }).status(201);
        }
    }catch(err){
        res.status(500).json({err:'error getting in POST API'})
    }
});




// get by id api
router.get('/getuser/:id', async(req , res) =>{
try{
    const user1= await user.findById(req.params.id)
    if (!user1){
        return res.status(404).json({error : "User Not Found !"})        
    }
    else{
        res.json({"data":user1}).status(201)
    }
}catch(err){
    res.status(500).json({err:'error getting in Get API'})
}
})



// multiple items will be updated
router.put('/updateuser/:_id', async(req , res) =>{
try{
    // console.log(req.params)
    const userExist =  await user.findOne({"_id":req.params})
    // console.log(userExist)
    if (!userExist){
        return res.status(404).json({error : "User Not Found !"}) 
    }
    else{
        let data = await user.updateMany(
            req.params,
            {
                $set:req.body
            }   
        );
        res.status(201).json({
            "data":data,
            "msg":"User Data Updated Successfully..!"
        })
        // console.log(data)
    }
}catch(err){
    res.status(500).send('error getting in patch API' , err)
}
})





router.delete('/deleteuser/:_id', async(req , res) =>{
try{
    console.log(req.params)
    user1 = await user.findOne(req.params)
    if (!user1){
        return res.status(404).json({error : "User Not Found !"})        
    }
    else{
        let data= await user.deleteOne(req.params);
        // console.log(data)
        return res.status(201).json({status : "User Deleted Successfully !"})        
    }
}catch(err){
    res.status(500).send('error getting in Delete API' , err)
}
})



module.exports = router;



















// //one item update
// app.put('/:_id', async(req , res) =>{
// try{
//     console.log(req.params)
//     let data = await employee.updateOne(
//         req.params,
//         {
//             $set:req.body
//         }
//     );
//     res.send(data)
// }catch(err){
//     res.send('error getting in patch API' , err)
// }
// })
