import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreatePet = () => {
    const navigate = useNavigate()

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState(['', '', '']);


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

    const newPet = {
      name,
      type,
      description,
      skills
    };

    try {
      const response = await axios.post('http://localhost:5000/pets/create', newPet); 
      console.log(response.data); 
   
      setName('');
      setType('');
      setDescription('');
      setSkills(['', '', '']);
      navigate('/')
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div className="container" style={{ width: '80vw' }}>
        
   
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
          <input
            key={index}
            type="text"
            className="form-control mb-2"
            value={skill}
            onChange={(e) => handleSkillChange(index, e)}
            placeholder={`Enter ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'} skill`}
          />
        ))}
      </div>
      <button type="submit" className="btn btn-primary">Create Pet</button>
    </form>
    </div>
  );
};

export default CreatePet;