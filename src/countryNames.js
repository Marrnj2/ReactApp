
function countryNames(){
    let unsortedKeys = Object.keys(localStorage);
    let sortedKeys = unsortedKeys.sort();
    return sortedKeys;
}

export default countryNames;
