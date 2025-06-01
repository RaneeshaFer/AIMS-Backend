import Order from "../models/Order.js";



// Get all orders
export function getAllOrders(req, res) {
  Order.find().then((result) => {
    res.json(result);
  });
}

// Post an order
export async function postOrder(req, res) {
  if (req.user == null) {
    res.json({ msg: "Please Login First" });
    return
  }
  if (req.user.role !== "Admin") {
    res.json({ msg: "You are not admin" });
    return;
  }
  let lastOrderId=await Order.find().sort({oid:-1}).limit(1);
    let oid=""
    if(lastOrderId.length==0){
        oid="O00001"
    }else{
        lastOrderId=lastOrderId[0].oid;
        oid="O"+(parseInt(lastOrderId.substring(2))+1).toString().padStart(5,"0")
    }

  const orderData = req.body
  orderData.oid=oid

 

  let order = new Order(orderData);
  await order.save().then(() => {
      res.json({ msg: "Order Created" });
    }).catch(() => {
      res.json({ msg: "Error in saving data" });
    });
}

// Delete an order
export async function deleteOrder(req, res) {
  if (!req.user) {
    res.json({ msg: "Please Login First" });
    return;
  }
  if (req.user.role !== "Admin") {
    res.json({ msg: "You are not an admin" });
    return;
  }

  const id = req.params.oid;

  await Order.deleteOne({ oid: id }).then(() => {
      res.json({ msg: "Order Deleted" });
    }).catch((err) => {
      res.json({ msg: err.message });
    });
}

// Update an order
export async function updateOrder(req, res) {
  if (!req.user) {
    res.json({ msg: "Please Login First" });
    return;
  }
  if (req.user.role !== "Admin") {
    res.json({ msg: "You are not admin" });
    return;
  }

  try {
    const id = req.params.oid;
    const data = req.body;

    await Order.updateOne({ oid: id }, data).then(() => {
        res.json({ msg: "Order Updated" });
      }).catch((err) => {
        res.json({ msg: err.message });
      })
  } catch (error) {
    res.json({ msg: error.message });
  }
}
