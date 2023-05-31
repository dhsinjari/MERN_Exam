import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import CreatePet from './components/CreatePet';
import PetDetails from './components/PetDetails';
import EditPet from './components/PetEdit';

function App() {
  const [users, setUsers] = useState(null)
  const fetchUsers = async ()=>{
    const {data} =await axios.get('http://localhost:5000/get-users')
    if(data){
      setUsers(data.users)
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/create-a-pet' element={<CreatePet/>} />
      <Route path='/pets/:id' element={<PetDetails/>} />
      <Route path='/pets/:id/edit' element={<EditPet/>} />

    </Routes>
   
  );
}

export default App;
