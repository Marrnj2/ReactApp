var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

function Form(props) {
    var _useState = useState(["...."]),
        _useState2 = _slicedToArray(_useState, 2),
        countries = _useState2[0],
        setCountries = _useState2[1];

    var _useState3 = useState("..."),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedCountry = _useState4[0],
        setSelectedCountry = _useState4[1];

    var _useState5 = useState([1800]),
        _useState6 = _slicedToArray(_useState5, 2),
        year = _useState6[0],
        setYear = _useState6[1];

    var _useState7 = useState("Select Year"),
        _useState8 = _slicedToArray(_useState7, 2),
        selectedYear = _useState8[0],
        setSelectedYear = _useState8[1];

    var _useState9 = useState(""),
        _useState10 = _slicedToArray(_useState9, 2),
        dataPresent = _useState10[0],
        setDataPresent = _useState10[1];

    function yearList() {
        var start = 1800;
        var end = 2100;
        var years = [];
        for (var i = start; i <= end; i++) {
            years.push(i);
        }
        return years;
    }
    function countryNames() {
        var storedNames = localStorage.getItem('countries');
        var countryNames = storedNames.split(',');
        return countryNames;
    }
    var loadCountries = useCallback(function () {

        return $.get("http://157.245.170.229/Countries/", function (response) {

            var obj = JSON.parse(response);
            var names = [];
            obj.forEach(function (element) {
                names.push(element.name);
                // let data = JSON.stringify(element)
                localStorage.setItem('countries', names);
            });
            console.log("here");
        });
    });

    useEffect(function () {
        if (!localStorage.getItem('countries')) {
            loadCountries().then(function (e) {
                setCountries(countryNames());
                setYear(yearList());
            });
        } else {
            setCountries(countryNames());
            setYear(yearList());
        }
    }, []);
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'select',
                    { className: 'form-control', value: selectedCountry, onChange: function onChange(e) {
                            return setSelectedCountry(e.target.value);
                        } },
                    React.createElement(
                        'option',
                        null,
                        'Select Country'
                    ),
                    countries.map(function (country, index) {
                        return React.createElement(
                            'option',
                            { key: index, value: country },
                            country
                        );
                    })
                ),
                React.createElement(
                    'select',
                    { className: 'form-control', onChange: function onChange(e) {
                            return setSelectedYear(e.target.value);
                        } },
                    React.createElement(
                        'option',
                        null,
                        'Select Year'
                    ),
                    year.map(function (year, index) {
                        return React.createElement(
                            'option',
                            { key: index, value: year },
                            year
                        );
                    })
                ),
                React.createElement(DataSet, { searchCountry: selectedCountry, year: selectedYear })
            )
        ),
        React.createElement(RemoveCountry, { country: selectedCountry }),
        React.createElement(AddCountry, null)
    );
}

function RemoveCountry(_ref) {
    var country = _ref.country;

    var deleteCountry = useCallback(function (e) {
        $.ajax({
            url: "http://157.245.170.229/Countries/" + country,
            type: 'DELETE',
            success: function success(result) {
                console.log("Removed " + country);
            },
            statusCode: {
                400: function _() {
                    console.log("Country not found");
                }
            }
        });
        var storedNames = localStorage.getItem('countries');
        var countryNames = storedNames.split(',');
        for (var i = 0; i < countryNames.length; i++) {
            if (countryNames[i] == country) {
                countryNames.splice(i, 1);i--;
            }
        }
        localStorage.setItem('countries', countryNames);
        e.preventDefault();
    });

    return React.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
                return deleteCountry(e);
            } },
        React.createElement('input', { className: 'btn btn-danger', type: 'submit', value: 'Delete' })
    );
}

function AddCountry() {
    var _useState11 = useState(""),
        _useState12 = _slicedToArray(_useState11, 2),
        newCountry = _useState12[0],
        setNewCountry = _useState12[1];

    var addCountry = useCallback(function (e) {
        // let localStorage = window.localStorage;
        var storedNames = localStorage.getItem('countries');
        var countryNames = storedNames.split(',');
        countryNames.push(newCountry);
        var sorted = countryNames.sort();
        localStorage.setItem('countries', sorted);
        $.post("http://157.245.170.229/Countries/" + newCountry, function () {
            console.log("Added " + newCountry + " to DB");
        }).fail(function () {
            console.log("Country already in database");
        });

        e.preventDefault();
    });
    // function addToLocal(){

    // }

    return React.createElement(
        'form',
        { className: 'form-group', onSubmit: function onSubmit(e) {
                return addCountry(e);
            } },
        React.createElement(
            'label',
            null,
            'New Country Name',
            React.createElement('input', { className: 'form-control', type: 'text', value: newCountry, onChange: function onChange(e) {
                    return setNewCountry(e.target.value);
                } })
        ),
        React.createElement('input', { className: 'btn btn-success', type: 'submit', value: 'Create New Country' })
    );
}

function DataSet(_ref2) {
    var searchCountry = _ref2.searchCountry,
        year = _ref2.year;

    var dataSets = ["income_per_person_gdppercapita_ppp_inflation_adjusted", "population_total", "life_expectancy_years"];

    var _useState13 = useState([""]),
        _useState14 = _slicedToArray(_useState13, 2),
        data = _useState14[0],
        setData = _useState14[1];

    var _useState15 = useState(["..."]),
        _useState16 = _slicedToArray(_useState15, 2),
        displayData = _useState16[0],
        setDisplayData = _useState16[1];

    var getDataByYear = useCallback(function () {
        var dataCollection = dataSets.map(function (dataSet) {
            var x = data[dataSet][year];

            return x;
        });
        return dataCollection;
    }, [data]);

    var loadData = useCallback(function (sC) {
        return $.get("http://157.245.170.229/Countries/" + sC, function (response) {

            var obj = JSON.parse(response);
            var data = obj[0].data;
            setData(data);
        });
    }, [searchCountry]);

    useEffect(function () {
        loadData(searchCountry).then(function (e) {
            setDisplayData(getDataByYear());
        });
    }, [searchCountry, year]);

    return (
        // displayData.map((cData,index) =>(
        //     <h1 key={index}>{cData}</h1>
        // ))
        React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                'Income Per Person: ',
                displayData[0]
            ),
            React.createElement(
                'p',
                null,
                'Population Total: ',
                displayData[1]
            ),
            React.createElement(
                'p',
                null,
                'Life Expectancy Years: ',
                displayData[2]
            )
        )
    );
}
export default Form;