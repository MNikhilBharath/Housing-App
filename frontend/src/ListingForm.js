// ListingForm.js - Form to submit a new housing listing
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListingForm() {
  const navigate = useNavigate();
  // State to hold form inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    address: "",
    number_of_rooms: "",
    contact_info: ""
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert numeric fields to numbers
    const payload = {
      ...formData,
      rent: Number(formData.rent),
      number_of_rooms: Number(formData.number_of_rooms)
    };
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        // On success, navigate to the listings page to view all listings
        navigate('/listings');
      } else {
        // If server returned an error, get the message and alert it
        const errorText = await response.text();
        alert("Failed to submit listing: " + errorText);
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("An unexpected error occurred while submitting the listing.");
    }
  };

  return (
    <div>
      <h2>List a New Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br/>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Description:</label><br/>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Rent (USD):</label><br/>
          <input 
            type="number" 
            name="rent" 
            value={formData.rent} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Address:</label><br/>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Number of Rooms:</label><br/>
          <input 
            type="number" 
            name="number_of_rooms" 
            value={formData.number_of_rooms} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Contact Info:</label><br/>
          <input 
            type="text" 
            name="contact_info" 
            value={formData.contact_info} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
}

export default ListingForm;
