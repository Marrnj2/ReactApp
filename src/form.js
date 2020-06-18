import React, { useState,useEffect,useCallback} from 'react';
import ReactDOM from 'react-dom';

function Form(props){
    let [countries, setCountries] = useState(["...."]);
    let [selectedCountry, setSelectedCountry] = useState("...");
    let [year,setYear] = useState(['']);
    let [selectedYear,setSelectedYear] = useState(1800);
    let [newCountry, setNewCountry] = useState("");
    function yearList(){
        const start = 1800;
        const end = 2100;
        let years = [];
        for(let i = start; i <= end; i++)
        {
            years.push(i);
        }
        setYear(years);
    }
    function countryNames(){
        
        
        // else
        // {
            let localStorage = window.localStorage;
            let storedNames = localStorage.getItem('countries');
            let countryNames = storedNames.split(',');
            return countryNames;
        // }
        
    }
    const loadCountries = useCallback (() =>{
         if(!localStorage.getItem('countries'))

        $.get("http://157.245.170.229/Countries/", (response) => {

            let obj = JSON.parse(response);
            let names = [];
            obj.forEach(element => {
                names.push(element.name);
                // let data = JSON.stringify(element)
                localStorage.setItem('countries', names);
             });
        });
    
    })
    useEffect(()=>{
        loadCountries();
        setCountries(countryNames());
        yearList();
    },[])


    return(
        <div>
            <form>
                <label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}> 
                    <option>...</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                    </select>

                </label>
                <RemoveButton country={selectedCountry}></RemoveButton>
            </form>
            <form>
                {/* <input type="number" value={year} onChange={e => setYear(e.target.value)}></input> */}
                <select onChange={(e) => setSelectedYear(e.target.value)}>
                {year.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <DataSet searchCountry={selectedCountry} year={selectedYear}></DataSet>

            </form>
           
           <AddCountry></AddCountry>

       </div>
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
    let [newCountry, setNewCountry] = useState("");
    const addCountry = useCallback ((e) =>{
        // let localStorage = window.localStorage;
        let storedNames = localStorage.getItem('countries');
        let countryNames = storedNames.split(',');
        countryNames.push(newCountry);
        let sorted = countryNames.sort();
        localStorage.setItem('countries', sorted);
        $.post("http://157.245.170.229/Countries/"+ newCountry,() =>{
            console.log("Added " + newCountry + " to DB");
        }).fail(function(){
            console.log("Country already in database");
        });

        e.preventDefault();
    });
    // function addToLocal(){
    
    // }

    return(
        <form onSubmit={(e) => addCountry(e)}>
            <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} />
            <input type="submit" value="Submit"/>
        </form>
        );
}




function DataSet({searchCountry, year}){
    const dataSets = ["income_per_person_gdppercapita_ppp_inflation_adjusted",
    "population_total","life_expectancy_years"];
    let [data,setData] = useState([""]);
    let [displayData, setDisplayData] = useState(["..."]);

   const getDataByYear =useCallback( () => {
        let dataCollection = dataSets.map((dataSet)=>{
            let x =  data[dataSet][year]
            console.log(x);

            return x;
        })
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
    },[searchCountry,year])


    return(
        // displayData.map((cData,index) =>(
        //     <h1 key={index}>{cData}</h1>
        // ))
    <div>
    <p>Income Per Person: {displayData[0]}</p>
    <p>Population Total: {displayData[1]}</p>
    <p>Life Expectancy Years: {displayData[2]}</p>
    </div>
    );
}
export default Form;
