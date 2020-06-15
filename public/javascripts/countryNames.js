
function CountryNames() {
    var storedNames = localStorage.getItem('countries');
    var convertedNames = storedNames.split(',');
    // for(let i in localStorage)
    // {
    //     console.log(i);
    // }

    return convertedNames;
}

export default CountryNames;