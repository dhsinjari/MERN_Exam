import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPet = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState(['', '', '']);

  useEffect(() => {
    fetchPet();
  }, []);

  const fetchPet = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pets/pet/${id}`); // Replace '/api/pets' with the appropriate endpoint URL for fetching a single pet
      const { name, type, description, skills } = response.data;
      setName(name);
      setType(type);
      setDescription(description);
      setSkills(skills);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the request
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSkillChange = (index, e) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = e.target.value;
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPet = {
      name,
      type,
      description,
      skills
    };

    try {
      const response = await axios.put(`http://localhost:5000/pets/update-pet/${id}`, updatedPet); 
      console.log(response.data);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-5' style={{width:"80vw"}}>
      <h1>Edit Pet</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" className="form-control" id="type" value={type} onChange={handleTypeChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" value={description} onChange={handleDescriptionChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Skills</label>
            {skills.map((skill, index) => (
            <div className="form-group" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter skill ${index + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e)}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default EditPet;