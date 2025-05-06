// ListingList.js - Display all housing listings
import React, { useEffect, useState } from 'react';

function ListingList() {
  const [listings, setListings] = useState([]);

  // Fetch listings from the backend when component mounts
  useEffect(() => {
    fetch('/api/listings')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching listings: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setListings(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  // Empty dependency array -> run once on component mount

  return (
    <div>
      <h2>Housing Listings</h2>
      {listings.length === 0 ? (
        <p>No listings available yet.</p>
      ) : (
        listings.map(listing => (
          <div key={listing.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{listing.title}</h3>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Rent:</strong> ${listing.rent}</p>
            <p><strong>Address:</strong> {listing.address}</p>
            <p><strong>Number of Rooms:</strong> {listing.number_of_rooms}</p>
            <p><strong>Contact Info:</strong> {listing.contact_info}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListingList;
