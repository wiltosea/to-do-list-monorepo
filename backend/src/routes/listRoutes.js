import { Router } from 'express';

const router = Router();

const list = [
  { id: 1, title: 'First item', completed: true},
  { id: 2, title: 'Second item', completed: false},
];

// get all items
router.get('/list', (req, res) => {
  res.json(list);
});

// get item by id
router.get('/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = list.find((element) => element.id === id);
  res.json(item);
});

// create new item
router.post('/list', (req, res) => {
  const item = req.body;
  list.push(item);
  res.json(item);
});

// update item by id
router.put('/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = list.find((element) => element.id === id);
  console.log(req.body)
  if (item) {
    console.log('item 🛠 ',item)
    item.title = req.body.title;
    item.completed = req.body.completed;
  }
  res.json(item);
});

// delete item by id
router.delete('/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = list.find((element) => element.id === id);
  if (item) {
    list.splice(list.indexOf(item), 1);
  }
  res.json(item);
});

router.delete('/list', (req, res) => {
  list.splice(0, list.length);
  res.json(list);
});

router.get('/list/search', (req, res) => {
  const title = req.query.title;
  const item = list.find((element) => element.title === title);
  res.json(item);
});


export default router;
