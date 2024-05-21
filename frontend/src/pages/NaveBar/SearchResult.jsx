import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import "./SearchResult.css"
import { setProviderId } from "../../Service/Redux/Slice/ProviderId";


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
        setSearchOptions(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      getDoctorsByName(query);
    } else {
      setSearchOptions([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      getDoctorsByName(searchQuery);
    } else {
      setSearchOptions([]);
    }
  };

  const handleOptionClick = (option) => {

    dispatch(setProviderId(option))

    navigate(`/Providers`)
     
    
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