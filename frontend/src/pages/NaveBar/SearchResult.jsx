import React, { useState } from "react";
import NavBar from "../../pages/NaveBar/NavBar"
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import "./SearchResult.css"
import Provider from "../../pages/Provider/Provider"
import { setProviderId } from '../../Service/Redux/Slice/ProviderId';
import { FcSearch } from "react-icons/fc";

const SearchResult = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);

   
  const {providerId} = useSelector((state) => ({
    providerId: state.provider.providerId,
  }));


  
  const getDoctorsByName = (searchTerm) => {
    axios.get(`http://localhost:5000/users/searchbyname/?firstname=${searchTerm}`)
      .then((result) => {
        console.log(result);
        setSearchOptions(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Fetch data based on the current search query
    if (query) {
      getDoctorsByName(query);
    } else {
      // Clear search options if searchQuery is empty
      setSearchOptions([]);
    }
  };

  const handleSearchSubmit = () => {
    // Perform search based on searchQuery
    console.log('Searching for:', searchQuery);
    if (searchQuery) {
      getDoctorsByName(searchQuery);
    } else {
      // Clear search options if searchQuery is empty
      setSearchOptions([]);
    }
  };

  const handleOptionClick = (option) => {

    
  
    navigate(`/Provider/${option.users_id}`)
     
    
    } 
  
    
 
  

  return (
    <> 
    
    <div className="searchContainer">

      <div className="searchBar">
        
        <input 
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
       
      </div>
      {/* Render dropdown list of options */}
      {searchOptions.length > 0 && (
        <div className="dropdown">
          <ul>
            {searchOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
               {option.firstname} {option.lastname}
              </li>
            ))}
          </ul>
        </div>
        
      )}
     
</div>
</>
  )}

export default SearchResult;