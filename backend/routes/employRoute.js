const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/",(req,res)=>{
    const query = "select * from employees";
    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({"message":"error fetching data"});
        }res.status(200).json(result);
    })
})
router.get("/:id",(req,res)=>{
    const query = "SELECT * FROM employees WHERE id =?"
    db.query(query,[req.params.id],(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).json({"message":"Database error"});
        }res.status(200).json(results);
    })
})

router.post("/",(req,res)=>{
    const {name,employee_id,email,phone_number,department,date_of_joining,role} = req.body;
    const query = `INSERT INTO employees (name, employee_id, email, phone_number, department, date_of_joining, role) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query,[name, employee_id, email, phone_number, department, date_of_joining, role],(err,result)=>{
        if(!err){
            res.status(201).send({message:"Employee created successfully"});
        }else{
        if(err.code=="ER_DUP_ENTRY"){
            console.log(err);
            res.status(400).send({message:"Employee already exists"});
        }
        else if(err){
            console.log(err);
            res.status(500).send({message:"Error inserting employee"});
        }}
    })
})
router.post("/update/:id",(req,res)=>{
    const employId = req.params.id;
    const {name,employee_id,email,phone_number,department,date_of_joining,role} = req.body;
    const query = `UPDATE employees SET name = ?, employee_id = ?, email = ?, phone_number = ?, department = ?, date_of_joining = ?, role = ?WHERE id = ?`;
    db.query(query,[name, employee_id, email, phone_number, department, date_of_joining, role, employId],(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({"message":"Error updating"});
        }res.status(200).json({"message":"Updated"})
    })
})
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Employee ID is required for deletion" });
    }
    const query = "DELETE FROM employees WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting employee:", err);
            return res.status(500).json({ message: "Server error while deleting employee" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ message: "Employee deleted successfully" });
    });
});


module.exports = router;
