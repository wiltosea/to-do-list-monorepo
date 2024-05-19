import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import DataService from './api/routes';

const { getAll, create, update } = new DataService();

function App() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [lastItem, setLastItem] = useState(0);

  const fetchList = async () => {
    const { data } = await getAll();
    setList(data);
  };

  const handlePost = async (event) => {
    if (newItem === '') return alert('Please enter a value');
    try {
      await create({ id: list[list.length-1].id+1, title: newItem, completed: false});
      setNewItem('');
      event.target.value = '';
      fetchList();
      console.log(list)
      setLastItem(lastItem+1);
    } catch (err) {
      console.log(err);
    }
    fetchList();
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handlePost(event);
    }
  };

  const handleUpdateCheck = async (id, completed, title) => {
    try {
      await update(id, title, { completed });
      fetchList();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  if (list.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="title text-center m-5">To Do List</h1>
              </div>
            </div>
            <div className="row pt-3 pb-3 mb-4">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add new item"
                  onChange={(e) => setNewItem(e.target.value)}
                  value={newItem}
                  id='newItemInsertInput'
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="col-2">
                <button className="btn btn-primary" onClick={handlePost} >
                  Add New Item
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {list.map((item) => (
                  <div key={item.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={item.id}
                      checked={item.completed}
                      onChange={(e) => {setList(list.map((i) => {
                        if (i.id === item.id) {
                          i.completed = e.target.checked;
                          console.log(i)
                          handleUpdateCheck(i.id, i.title, i.completed);
                        }
                        console.log(list)
                        return i;
                      }
                      ))}}
                    />
                    <label
                      className="form-check-label justify-content-start"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
