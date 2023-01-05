// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getNameCountries } from "../actions";

// export default function SearchBar(){
//     const dispatch = useDispatch()
//     const [name, setName] = useState('')
//     const [currentPage, setCurrentPage] = useState (1)

//     function handleInputChange(e){
//         e.preventDefault();
//         setName(e.target.value);
//         console.log(name);
//         setCurrentPage(1);
//     }

//     function handleSubmit(e){
//         e.preventDefault()
//         dispatch(getNameCountries(name))
//         setCurrentPage(1);
//     }

//     return (
//         <div>
//             <input type='text' placeholder= 'Search ...' onChange={(e) => handleInputChange(e)}/>
//             <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
//         </div>
//     )
// }

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { actualPage, getNameCountries } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const currentPage = useSelector((state) => state.currentPage);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(actualPage(1))
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name));
    dispatch(actualPage(1))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search ..."
        onChange={e => handleInputChange(e)}
      />
      <button type="submit" onClick={e => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
