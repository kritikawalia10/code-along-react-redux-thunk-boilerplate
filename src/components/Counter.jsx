import { useState } from 'react';
import { applyMiddleware, createStore } from 'redux';
import Reducer from './Reducer';
import { getUsersData, displayErrors } from './Action';
import axios from 'axios';
import {thunk} from 'redux-thunk';
import '../App.css';

const store = createStore(Reducer, applyMiddleware(thunk));

const getData= () => () => {
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        store.dispatch(getUsersData(response.data))
    })
    .catch(error => {
        store.dispatch(displayErrors(error.message))
    });
};

const Counter = () => {
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
 
  const onClick = () => {
    store.dispatch(getData());
    toggle();
  }
  store.subscribe(() => {
    setUsers(store.getState().usersList);
  });

  const toggle = () => {
    setDisplay(!display);
  };

  return (
    <>
      {display && (
          <div>
             {users.map(user => (
                 <div key={user.id}>
            <div>
                 <h3>{user.name}</h3>
                   <h4>{user.email}</h4>
                 </div>
            <hr/>
          </div>
  ))}
</div>
)}

      
      <button className="main" onClick={onClick}>
        {display ? 'Hide' : 'Display'}
      </button>
      
    </>
  );
}
  
export default Counter;