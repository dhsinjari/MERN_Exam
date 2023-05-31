import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pets'); 
      setPets(response.data);
    } catch (error) {
      console.error(error);
   
    }
  };

  return (
    <div style={{ width: '80vw' }} className='container'>
      <div  className=" mt-4 d-flex justify-content-end mb-3">
        <Link to="/create-a-pet" className="btn btn-primary">Add a Pet to the shelter</Link>
      </div>

      <h1>Pet Shelter</h1>
      <h2>These pets are looking for a good home</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>
                <Link to={`/pets/${pet._id}`} className="btn btn-primary mr-2">Details</Link>
                <Link to={`/pets/${pet._id}/edit`} className="btn btn-secondary">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;