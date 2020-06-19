import React, { useState,useEffect,useCallback} from 'react';

function Form(props) {
    let [countries, setCountries] = useState(["...."]);
    let [selectedCountry, setSelectedCountry] = useState("...");
    let [year,setYear] = useState([1800]);
    let [selectedYear,setSelectedYear] = useState("Select Year");
    function yearList(){
        const start = 1800;
        const end = 2100;
        let years = [];
        for(let i = start; i <= end; i++)
        {
            years.push(i);
        }
        return years;
    }
    function countryNames(){
            let storedNames = localStorage.getItem('countries');
            let countryNames = storedNames.split(',');
            return countryNames;
    }
    const loadCountries = useCallback (() =>{
       
            return $.get("http://157.245.170.229/Countries/", (response) => {

                let obj = JSON.parse(response);
                let names = [];
                 obj.forEach(element => {
                    names.push(element.name);
                    // let data = JSON.stringify(element)
                    localStorage.setItem('countries', names);
    
                 });
                 console.log("here");
            });
        
      
       
    })

    useEffect(() =>{
        if(!localStorage.getItem('countries'))
        {
            loadCountries().then(e =>{
                setCountries(countryNames())
                setYear(yearList());
            })
        }
        else{
            setCountries(countryNames())
            setYear(yearList());
        }
       
    },[]);
    return(     
        <div>
            <div className="form-group">
                <form >
                    <select className="form-control" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}> 
                        <option>Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                        </select>

                    <select className="form-control" onChange={(e) => setSelectedYear(e.target.value)}>
                    <option>Select Year</option>
                    {year.map((year, index) => (
                            <option key={index} value={year}>
                            {year}
                            </option>
                        ))}
                    </select>
                    <DataSet searchCountry={selectedCountry} year={selectedYear}></DataSet>
                </form>
            </div>
            <RemoveCountry country={selectedCountry}></RemoveCountry>
            <AddCountry></AddCountry>
       </div>
    );
}

function RemoveCountry({country}){
    const deleteCountry = useCallback ((e) =>{
        $.ajax({
            url:"http://157.245.170.229/Countries/"+ country,
            type: 'DELETE',
            success: (result) =>{
                console.log("Removed " + country);
            },
            statusCode: {
                400: () =>{
                    console.log("Country not found")
                }
            }
        });
        let storedNames = localStorage.getItem('countries');
        let countryNames = storedNames.split(',');
        for( var i = 0; i < countryNames.length; i++)
        {
             if ( countryNames[i] == country)
              { countryNames.splice(i, 1); i--;
         }
        }
        localStorage.setItem('countries', countryNames);
        e.preventDefault();

    })

    return(
        <form  onSubmit={(e) => deleteCountry(e)}>
        <input className="btn btn-danger" type="submit" value="Delete"/>
        </form>
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
        <form className="form-group" onSubmit={(e) => addCountry(e)}>

            <label >
                New Country Name  

                <input className="btn btn-success" type="submit" value="Create New Country"/>
                <input className="form-control" type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}/>

            </label>
            
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
