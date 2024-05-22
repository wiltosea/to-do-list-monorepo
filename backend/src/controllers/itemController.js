import Item from '../models/itemModel.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createItem = async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}