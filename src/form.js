import React, { useState,useEffect,useCallback} from 'react';
// Assemsbles the form to be returned to the main view
function Form(props) {
    let [countries, setCountries] = useState(["...."]);
    let [selectedCountry, setSelectedCountry] = useState("...");
    let [year,setYear] = useState([1800]);
    let [selectedYear,setSelectedYear] = useState("Select Year");
    // Creates a list of years because i was to slow to do it the real way
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
    // Pulls the countrys from local storage and returns them as an array by spliting them on the comma
    function countryNames(){
            let storedNames = localStorage.getItem('countries');
            let countryNames = storedNames.split(',');
            return countryNames;
    }
    // Calls the get all countries API and assigns the names to local storage
    const loadCountries = useCallback (() =>{
       
            return $.get("http://157.245.170.229/Countries/", (response) => {

                let obj = JSON.parse(response);
                let names = [];
                // Each element in the response will be added to the local storage
                 obj.forEach(element => {
                    names.push(element.name);
                    // let data = JSON.stringify(element)
                    localStorage.setItem('countries', names);
    
                 });
                 console.log("here");
            });
        
      
       
    })
    //IF countries is not in local storage call the api to get it then render 
    // OR if its already there just render 
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
                    {/* itterates through the countries creating a new option based of its value */}
                        <option>Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                        </select>

                    <select className="form-control" onChange={(e) => setSelectedYear(e.target.value)}>
                    <option>Select Year</option>
                    {/* itterates through the years creating a new option based of its value */}
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
// Accpets the current selected country removes it from the local storage and database if the button has been 
// clicked
function RemoveCountry({country}){
    // Calls the delete api passing the country to be removed then procceeds to remove it from local storage
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
        // Itterates through the list of countrys untill it finds the country to be removed and 
        // removes it from the local storage
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


//Creates the form for adding a country and calls the API to add it to the database
function AddCountry(){
    let [newCountry, setNewCountry] = useState("");
    // Addes a new country to lcoal storage and calls the api to add it to the database
    const addCountry = useCallback ((e) =>{
      
        // Checks to see if the input is invlaid
        if(newCountry === " " || newCountry === "" || newCountry === "INVLAID COUNTRY NAME")
        {
            setNewCountry("INVLAID COUNTRY NAME");
        }else{
              // split the countrys from local storage then sort them in order and add them back to local storage
            // Also call the api to add it to the database
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
    
        }
      
        e.preventDefault();
    });
    return(
        <form className="form-group" onSubmit={(e) => addCountry(e)}>

                <label>
                New Country Name  
                </label>
                <input className="form-control" type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}/>
                <input className="btn btn-success" type="submit" value="Create New Country"/>

           
            
        </form>
        );
}


// Accpets a coutry and year and return data relevent for that country and year
function DataSet({searchCountry, year}){
    const dataSets = ["income_per_person_gdppercapita_ppp_inflation_adjusted",
    "population_total","life_expectancy_years"];
    let [data,setData] = useState([""]);
    let [displayData, setDisplayData] = useState(["..."]);
    // Itterates through the datasets getting the data the that year
   const getDataByYear =useCallback( () => {
        let dataCollection = dataSets.map((dataSet)=>{
            let x =  data[dataSet][year]

            return x;
        })
        return dataCollection;
    },[data])
    // Calls the load country api and uses setData to store it for later use
    const loadData = useCallback ((sC) =>{
        return $.get("http://157.245.170.229/Countries/" + sC, (response) => {

            let obj = JSON.parse(response);
            let data= obj[0].data
            setData(data)
        })
    },[searchCountry]);
    // When either year or country changes get the relvent data
    useEffect(() => {
        loadData(searchCountry).then(e=>{
            setDisplayData(getDataByYear());
        });
    },[searchCountry,year])


    return(

    <div className="pt-5">
    <p>Income Per Person: {displayData[0]}</p>
    <p>Population Total: {displayData[1]}</p>
    <p>Life Expectancy Years: {displayData[2]}</p>
    </div>
    );
}
export default Form;
