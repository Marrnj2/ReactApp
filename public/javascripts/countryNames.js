
function countryNames() {
    var unsortedKeys = Object.keys(localStorage);
    var sortedKeys = unsortedKeys.sort();
    return sortedKeys;
}

export default countryNames;