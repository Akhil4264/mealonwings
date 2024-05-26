import React, { useState, useEffect } from 'react';
import {add} from '../services/foodService'
import { Link } from 'react-router-dom';


const Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
    cookTime: '',
    price: 0,
    origins: [],
    imageUrl: '',
    tags: []
  });

  const [allorders, setAllOrders] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'select-multiple') {
      let options = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        [name]: options
      });
    } else if (type === 'file') {
      console.log(e.target.files[0].name,name)
      setFormData({
        ...formData,
        [name]: e.target.files[0].name
      });
    }
    else{
      console.log(value)
      setFormData({
        ...formData,
        [name]: value
      });
    }

    console.log()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add(formData)
    console.log(formData);
    // Submit logic here
  };

  return (
    <div className='container'>
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cookTime" className="form-label">Cook Time</label>
          <input
            type="text"
            className="form-control"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            placeholder="Cook Time"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            min={0}
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="origins" className="form-label">Origins</label>
          <select
            multiple
            className="form-control"
            id="origins"
            name="origins"
            value={formData.origins}
            onChange={handleChange}
          >
            <option value="italy">Italy</option>
            <option value="usa">USA</option>
            <option value="mexico">Mexico</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            // value={formData.imageUrl}
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handleChange}
            placeholder="Upload Image"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <select
            multiple
            className="form-control"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          >
            <option value="FastFood">Fast Food</option>
            <option value="Pizza">Pizza</option>
            <option value="Lunch">Lunch</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <div className='container m-3'>
      <Link to='/orders'>All orders</Link>
    </div>
    </div>
  );
};

export default Employee;
