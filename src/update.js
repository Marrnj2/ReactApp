import React, { useState, useEffect} from 'react';
import CountryNames from './countryNames.js'
function Update(props) {
    let [myKeys, setKeys] = useState((CountryNames()));
        return(
            <form>
                <label>
                <select> 
                {myKeys.map(item => (
                    <CountrySelect name={item}/>
                ))}
                  </select>

                </label>

            </form>
           
        );
    

}

function CountrySelect(props){
        return(
            <option value={props.name}>
                {props.name}
            </option>
        );
}
//domElement = document.getElementById("update_container");
//ReactDOM.render(<Update/>,domElement);
export default Update;