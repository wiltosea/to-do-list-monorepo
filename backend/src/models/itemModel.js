import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
