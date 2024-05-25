import { useEffect, useState } from 'react';
import './App.css';
import DataService from './api/routes';

const { getAll, create, update, remove } = new DataService();

function App() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [lastItem, setLastItem] = useState(0);

  const fetchList = async () => {
    const { data } = await getAll();
    setList(data);
  };
  
  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handlePost(event);
    }
  };

  const handlePost = async (event) => {
    if (newItem === '') return alert('Please enter a value');
    try {
      await create({ title: newItem, completed: false});
      setNewItem('');
      event.target.value = '';
      fetchList();
      console.log('list do handlePost 🛠 ',list)
      setLastItem(lastItem+1);
    } catch (err) {
      console.log('Erro do handlePost 🛠 ',err);
    }
    fetchList();
  };


  const handleDelete = async (id) => {
    console.log(id)
    try {
      await remove(id);
      fetchList();
    } catch (err) {
      console.log('Erro do handleDelete 🛠 ',err);
    }
  };

  const handleUpdateCheck = async (id, title,completed) => {
    try {
      console.log('id 🛠 ',id);
      console.log('title 🛠 ',title);
      console.log('completed 🛠 ', completed);
      const data = {title: title, completed: completed};
      await update(id, data);
      fetchList();
    } catch (err) {
      console.log('Erro do handleUpdateCheck 🛠 ',err);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

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
                  <div key={item._id} className="form-check align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={item._id}
                      checked={item.completed}
                      onChange={(e) => {setList(list.map((i) => {
                        if (i._id === item._id) {
                          i.completed = e.target.checked;
                          console.log(e.target.checked);
                          // console.log('item do onChange do Input 🛠 ',i)
                          // console.log('item do onChange do Input 🛠 ',i)
                          handleUpdateCheck(i._id, i.title, i.completed);
                        }
                        console.log(list)
                        return i;
                      }
                      ))}}
                    />
                    <span
                      className="form-check-label justify-content-start"
                      style={(item.completed)?{textDecoration: 'line-through'}:{}}
                    >
                      {item.title}
                    </span>
                    {(item.completed)?(<span className='p-2' onClick={()=>handleDelete(item._id)} style={{cursor: 'pointer'}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50"><path fill="currentColor" d="M20 18h2v16h-2zm4 0h2v16h-2zm4 0h2v16h-2zm-16-6h26v2H12zm18 0h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3z"/><path fill="currentColor" d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24l2-.2l1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24l2 .2l-1.8 24C34 38.7 32.6 40 31 40"  /></svg></span>):''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default App;
