import Appointment from "../models/Appointment.js";

export function getAllAppointments(req,res){
    Appointment.find().then((result)=>{
        res.json(result)
    })
}
export async function postAppointment(req,res){
    if(req.user==null){
        res.json({msg:"Please Login First"});
        return
    }
    if(req.user.role!=="Admin"){
        res.json({msg:"You are not admin"})
        return
    }
    let lastAppId=await Appointment.find().sort({aid:-1}).limit(1);
    let aid=""
    if(lastAppId.length==0){
        aid="A00001"
    }else{
        lastAppId=lastAppId[0].aid;
        aid="A"+(parseInt(lastAppId.substring(2))+1).toString().padStart(5,"0")
    }
    const appointmentData = req.body
    appointmentData.aid=aid
   
    let appointment = new Appointment(appointmentData);
    await appointment.save().then(() => {
       res.json({
         msg: "Appointment Created"
       });
     }).catch(() => {
       res.json({
         msg: "Error in saving data"
       })
     })
   }
   export async function deleteAppointment(req, res) {
    if(!req.user){
        res.json({msg:"Please Login First"});
        return
    }
    if(req.user.role!=="Admin"){
        res.json({msg:"You are not an admin"})
        return
    }
  
    const id = req.params.aid;

  await Appointment.deleteOne({ aid: id }).then(() => {
      res.json({ msg: "Appointment Deleted" });
    }).catch((err) => {
      res.json({ msg: err.message});
    });
}
export async function updateAppointment(req, res) {
  if(!req.user){
    res.json({msg:"Please Login First"});
    return
}
if(req.user.role!=="Admin"){
    res.json({msg:"You are not admin"});
}
    try {
        const id = req.params.aid;
        const data = req.body;
    
        await Appointment.updateOne({ aid: id }, data).then(() => {
            res.json({ msg: "Appointment Updated" });
          }).catch((err) => {
            res.json({ msg: err.message });
          })
      } catch (error) {
        res.json({ msg: error.message })
      }
    }