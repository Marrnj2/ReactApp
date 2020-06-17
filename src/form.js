import React, { useState, useEffect,useCallback} from 'react';
import ReactDOM from 'react-dom';
import countryNames from './countryNames.js'

function Form(props){
    let countryList = countryNames();
    let [countries, setCountries] = useState(countryList);
    let [selectedCountry, setSelectedCountry] = useState(countryList[0]);

    return(
        <form>
            <label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}> 
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
                  </select>

            </label>
            <RemoveButton country={selectedCountry}></RemoveButton>
        </form>
       
    );
}

function RemoveButton({country}){
    const  deleteCountry = useCallback ((c) =>{
        $.ajax({
            url:"http://157.245.170.229/Countries/"+ country,
            type: 'DELETE',
            success: (result) =>{
                console.log("Removed");
            },
            statusCode: {
                400: () =>{
                    console.log("Country not found")
                }
            }
        });
        let localStorage = window.localStorage;
        localStorage.removeItem(country);
        setCountries.useState(countryNames());
    },[country])

    return(
        <button onClick={() => {deleteCountry(country)}}>Delete {country}</button>
    );
}

export default Form;
