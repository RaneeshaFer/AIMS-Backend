
import Student from "../models/Student.js";

export function getAllStudents(req,res){
    Student.find().then((result)=>{
        res.json(result)
    })
}

export async function postStudent(req,res){
    if(req.user==null){
        res.json({msg:"Please Login First"});
        return
    }
    if(req.user.role!="Admin"){
        res.json({msg:"You are not admin"})
        return
    }

    let lastStId=await Student.find().sort({sid:-1}).limit(1);
    let sid=""
    if(lastStId.length==0){
        sid="ST00001"
    }else{
        lastStId=lastStId[0].sid;
        sid="ST"+(parseInt(lastStId.substring(2))+1).toString().padStart(5,"0")
    }
    const studentData=req.body
    studentData.sid=sid
    // let studentData=req.body;
    let student=new Student(studentData);
    
    await student.save().then(()=>{
        res.json({
            msg:"Student Saved"
        })
    }).catch(()=>{
        res.json({
            msg:"Error in saving data"
        })
    })
}

export async function deleteStudent(req,res){

    if(!req.user){
        res.json({msg:"Please Login First"});
        return
    }
    if(req.user.role!="Admin"){
        res.json({msg:"You are not an admin"})
        return
    }

    const id=req.params.sid;
    // console.log(id);
    await Student.deleteOne({sid:id}).then(()=>{
        res.json({msg:'Student Deleted'})
    }).catch((err)=>{
        res.json({msg:'err.message'});
    });
}

export async function updateStudent(req,res){
    //const id=req.params.sid;
    //console.log(req.params.sid)
    // res.json({id:id})
    if(!req.user){
        res.json({msg:"Please Login First"});
        return
    }
    if(req.user.role!="Admin"){
        res.json({msg:"You are not admin"});
    }


    try {
        const id=req.params.sid;
        const data=req.body;
        //console.log(data)
        await Student.updateOne({sid:id},data).then(()=>{
            res.json({msg:"Data Updated"})
        }).catch((err)=>{
            req.json({msg:err.message})
        })
    } catch (error) {
        res.json({msg:error.message})
    }
}