import Customer from "../models/Customer.js";

export function getAllCustomers(req, res) {
    Customer.find().then((result) => {
      res.json(result);
    });
  }

  export async function postCustomer(req, res) {
    if(req.user==null){
      res.json({msg:"Please Login First"});
      return
  }
  if(req.user.role!="Admin"){
      res.json({msg:"You are not admin"})
      return
  }
  let lastCustomerId =await Customer.find().sort({ cid: -1 }).limit(1);
  let cid = ""
if (lastCustomerId.length ==0) {
    cid = "C00001";
  } else {
    lastCustomerId = lastCustomerId[0].cid;
    cid = "C" + (parseInt(lastCustomerId.substring(2)) + 1).toString().padStart(5, "0");
  }
    const customerData = req.body;
    customerData.cid = cid;
    //console.log(customerData)
    let customer = new Customer(customerData);
   await customer.save().then(() => {
      res.json({
        msg: "Customer Saved"
      });
    }).catch(() => {
      res.json({
        msg: "Error in saving data"
      })
    })
  }
  export async function deleteCustomer(req,res){
    if(!req.user){
      res.json({msg:"Please Login First"});
      return
  }
  if(req.user.role!="Admin"){
      res.json({msg:"You are not an admin"})
      return
  }
    const id=req.params.cid;
    
    await Customer.deleteOne({cid:id}).then(()=>{
      res.json({msg:'Customer Deleted'})
  }).catch((err)=>{
      res.json({msg:'err.message'});
  });
}
export async function updateCustomer(req,res){
  if(!req.user){
    res.json({msg:"Please Login First"});
    return
}
if(req.user.role!="Admin"){
    res.json({msg:"You are not admin"});
}
  
  try {
    const id=req.params.cid;
    const data=req.body;
    //console.log(data)
    await Customer.updateOne({cid:id},data).then(()=>{
        res.json({msg:"Customer Updated"})
    }).catch((err)=>{
        req.json({msg:err.message})
    })
} catch (error) {
    res.json({msg:error.message})
}
}

    
  
    