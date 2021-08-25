const Item = require('../../db/models/item/index');

module.exports.getAllItems = (req, res) => {
  Item.find().then(result => {
    res.send({data: result})
  });
};

module.exports.createNewItem = (req, res) => {
  const item = new Item(req.body);
  item.save().then(result => {
    res.send(item);
  }).catch(err => console.log(err));
};

module.exports.changeItemInfo = async (req, res) => {
  try {
    await Item.updateOne({ _id: req.params.id }, req.body);
    res.send({ _id: req.params.id, body: req.body });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    await Item.deleteOne({_id: req.params.id});
    res.send({_id: req.params.id});
  } catch (err) {
    console.log(err);
  }
};
