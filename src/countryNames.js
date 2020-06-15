
function CountryNames(){
    let storedNames = localStorage.getItem('countries');
    let convertedNames = storedNames.split(',');
    // for(let i in localStorage)
    // {
    //     console.log(i);
    // }
    
    return convertedNames;
}

export default CountryNames;
