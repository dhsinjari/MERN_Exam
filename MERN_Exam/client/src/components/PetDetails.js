import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PetDetails = () => {
    const navigate = useNavigate()

  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetchPet();
  }, []);

  const fetchPet = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pets/pet/${id}`); 
      setPet(response.data);
    } catch (error) {
      console.error(error);

    }
  };

  const handleAdoptPet =async() => {
    // Handle the adoption logic here
    console.log('Pet adopted!');
    try {
        const response = await axios.delete(`http://localhost:5000/pets/delete/${id}`); 

        navigate('/')
      } catch (error) {
        console.error(error);

      }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{width:"80vw"}}  className="container mt-5">
      <div  className="container mt-5 d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>

      <h1>Pet Shelter</h1>
      <h2>Details about {pet.name}</h2>

      <button onClick={handleAdoptPet} className="btn btn-primary mb-3">Adopt {pet.name}</button>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Pet type: {pet.type}</h5>
          <p className="card-text">Description: {pet.description}</p>
          <p className="card-text">Skills: {pet.skills.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;