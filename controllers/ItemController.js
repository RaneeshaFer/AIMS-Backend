import Item from "../models/Item.js";

// GET all items
export function getAllItems(req, res) {
  Item.find().then((result) => {
    res.json(result);
  });
}

// POST item
export async function postItem(req, res) {
  if (!req.user) {
    res.json({ msg: "Please Login First" });
    return;
  }
  if (req.user.role !== "Admin") {
    res.json({ msg: "You are not admin" });
    return;
  }
  let lastItemId=await Item.find().sort({itemid:-1}).limit(1);
    let itemid=""
    if(lastItemId.length==0){
        itemid="I00001"
    }else{
        lastItemId=lastItemId[0].itemid;
        itemid="I"+(parseInt(lastItemId.substring(2))+1).toString().padStart(5,"0")
    }

  const itemData = req.body
  itemData.itemid=itemid

  const item = new Item(itemData);
  await item.save().then(() => {
    res.json({ msg: "Item Created" });
  }).catch(() => {
    res.json({ msg: "Error in saving data" });
  });
}

// DELETE item
export async function deleteItem(req, res) {
  if (!req.user) {
    res.json({ msg: "Please Login First" });
    return;
  }
  if (req.user.role !=="Admin") {
    res.json({ msg: "You are not an admin" });
    return;
  }

  const id = req.params.itemid;

  await Item.deleteOne({ itemid: id }).then(() => {
    res.json({ msg: "Item Deleted" });
  }).catch((err) => {
    res.json({ msg: err.message });
  });
}

// UPDATE item
export async function updateItem(req, res) {
  if (!req.user) {
    res.json({ msg: "Please Login First" });
    return;
  }
  if (req.user.role !== "Admin") {
    res.json({ msg: "You are not admin" });
    return;
  }

  try {
    const id = req.params.itemid;
    const data = req.body;

    await Item.updateOne({ itemid: id }, data).then(() => {
      res.json({ msg: "Item Updated" });
    }).catch((err) => {
      res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
}
