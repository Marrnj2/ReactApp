var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect, useCallback } from 'react';
import countryNames from './countryNames.js';

function Update(props) {
    var countryList = countryNames();

    var _useState = useState(countryList),
        _useState2 = _slicedToArray(_useState, 2),
        countries = _useState2[0],
        setCountries = _useState2[1];

    var _useState3 = useState(countryList[0]),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedCountry = _useState4[0],
        setSelectedCountry = _useState4[1];

    var _useState5 = useState(""),
        _useState6 = _slicedToArray(_useState5, 2),
        newCountry = _useState6[0],
        setNewCountry = _useState6[1];

    function updateList() {
        var storedNames = localStorage.getItem('countries');
        var convertedNames = storedNames.split(',');
        return convertedNames;
    };

    var updateCountry = useCallback(function (c) {

        alert(c);
    }, [newCountry]);

    return React.createElement(
        'form',
        { onSubmit: function onSubmit() {
                updateCountry(newCountry);
            } },
        React.createElement(
            'label',
            null,
            React.createElement(
                'select',
                { value: selectedCountry, onChange: function onChange(e) {
                        return setSelectedCountry(e.target.value);
                    } },
                countries.map(function (country, index) {
                    return React.createElement(
                        'option',
                        { key: index, value: country },
                        country
                    );
                })
            )
        ),
        React.createElement('input', { type: 'text', value: newCountry, onChange: function onChange(e) {
                return setNewCountry(e.target.value);
            } }),
        React.createElement('input', { type: 'submit', value: 'Submit' })
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