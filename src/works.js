import React, { useState,useEffect,useCallback} from 'react';
import ReactDOM from 'react-dom';

function Form(props){
    let countryList = countryNames();
    let [countries, setCountries] = useState(countryList);
    let [selectedCountry, setSelectedCountry] = useState(countryList[0]);
    
    function countryNames(){
        const loadCountries = useCallback (() =>{
            $.get("http://157.245.170.229/Countries/", (response) => {
    
                let obj = JSON.parse(response);
                let names = [];
                console.log(response.name);
                obj.forEach(element => {
                    names.push(element.name);
                    // let data = JSON.stringify(element)
                    localStorage.setItem('countries', names);
                 });
            });
        
        })
        if(!localStorage.getItem('countries')) {
            loadCountries();
          } else {
            let storedNames = localStorage.getItem('countries');
            let convertedNames = storedNames.split(',');
            return convertedNames;
          }
    }
   
  
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
            <AddCountry></AddCountry>
            <DataSet searchCountry={selectedCountry}></DataSet>

        </form>
       
    );
}

function RemoveButton({country}){
    const deleteCountry = useCallback ((c) =>{
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

function AddCountry(){
    let [newCountry,setNewCountry] = useState(" ");
    const addCountry = useCallback ((nc) =>{

        $.post("http://157.245.170.229/Countries/"+nc,() =>{
            console.log("Added " + nc + " to DB");
        }).fail(function(){
            console.log("Country already in database");
        });

        let localStorage = window.localStorage;
        localStorage.setItem(nc," ");
        alert(nc);
    },[newCountry]);

    return(
        <label>
        <button onClick={() => {addCountry(newCountry)}}>Add Country</button>
        <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}></input>        </label>
    );
}


function DataSet({searchCountry, year = 1980}){
    const dataSets = ["income_per_person_gdppercapita_ppp_inflation_adjusted",
    "population_total","life_expectancy_years"];
    let [data,setData] = useState(0);
    let [displayData, setDisplayData] = useState(["..."]);

    const getDataByYear =useCallback( () => {
        let dataCollection = dataSets.map((dataSet)=>{
            let x =  data[dataSet][year]
            return x;
        })
        console.log(dataCollection);
        return dataCollection;
    },[data])

    const loadData = useCallback ((sC) =>{
        return $.get("http://157.245.170.229/Countries/" + sC, (response) => {

            let obj = JSON.parse(response);
            let data= obj[0].data
            setData(data)
        })
    },[searchCountry]);

    useEffect(() => {
        loadData(searchCountry).then(e=>{
            setDisplayData(getDataByYear());
    });
  });

    
    return(
        <>{displayData.map((dd,index) => (<p key={index}>{dd}</p>))}</>
        );
}
export default Form;
