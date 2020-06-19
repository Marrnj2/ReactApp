import React, { useState, useEffect,useCallback} from 'react';
import countryNames from './countryNames.js'

function Update(props) {
    let countryList = countryNames();
    let [countries, setCountries] = useState(countryList);
    let [selectedCountry, setSelectedCountry] = useState(countryList[0]);
    let [newCountry, setNewCountry] = useState("");
    
    function updateList(){
        let storedNames = localStorage.getItem('countries');
        let convertedNames = storedNames.split(',');
        return convertedNames;

    };
 
    const  updateCountry = useCallback ((c) =>{
    
        alert(c);
    },[newCountry])

        return(
            <form onSubmit={() => {updateCountry(newCountry)}}>
                <label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}> 
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
                  </select>

                </label>
                <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}></input>
                <input type="submit" value="Submit" />
            </form>
           
        );
    

}


export default Update;



// import React, { useState, useEffect,useCallback} from 'react';
// import countryNames from './countryNames.js'

// function Update(props) {
//     let countryList = countryNames();
//     let [countries, setCountries] = useState(countryList);
//     let [selectedCountry, setSelectedCountry] = useState(countryList[0]);
//     let [newCountry, setNewCountry] = useState("");
    
//     function updateList(){
//         let storedNames = localStorage.getItem('countries');
//         let convertedNames = storedNames.split(',');
//         return convertedNames;

//     };
 
//     const  updateCountry = useCallback ((c) =>{
    
//         alert(c);
//     },[newCountry])

//         return(
//             <form onSubmit={() => {updateCountry(newCountry)}}>
//                 <label>
//                 <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}> 
//                 {countries.map((country, index) => (
//                     <option key={index} value={country}>
//                         {country}
//                     </option>
//                 ))}
//                   </select>

//                 </label>
//                 <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}></input>
//                 <input type="submit" value="Submit" />
//             </form>
           
//         );
    

// }
