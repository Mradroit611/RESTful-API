const express = require("express");
const Student = require("../models/students")
const router = new express.Router();

// Using promises 
// app.post("/students", (req, res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
    
// })


// Using async-await /
router.post("/students", async(req, res)=>{
    try{
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

router.get("/students", async(req, res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})

// Getting individual students data 
router.get("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;    //getting only id using params
        const studentData = await Student.findById(_id);
        if(!studentData){
            return res.status(404).send();
        }else{
        res.send(studentData)
        }
    }catch(e){
        res.status(500).send(e);
    }
})


// Deleting student data using id 
router.delete("/students/:id", async(req, res)=>{
    try{
        const id = req.params.id;
        const studentData = await Student.findByIdAndDelete(id);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})


// Updating student data using id
router.patch("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {new: true});
        res.send(updateStudent);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;