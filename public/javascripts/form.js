var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import countryNames from './countryNames.js';

function Form(props) {
    var countryList = countryNames();

    var _useState = useState(countryList),
        _useState2 = _slicedToArray(_useState, 2),
        countries = _useState2[0],
        setCountries = _useState2[1];

    var _useState3 = useState(countryList[0]),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedCountry = _useState4[0],
        setSelectedCountry = _useState4[1];

    return React.createElement(
        'form',
        null,
        React.createElement(
            'label',
            null,
            React.createElement(
                'select',
                { value: selectedCountry, onChange: function onChange(e) {
                        return setSelectedCountry(e.target.value);
                    } },
                countries.map(function (country, index) {
                    return React.createElement(
                        'option',
                        { key: index, value: country },
                        country
                    );
                })
            )
        ),
        React.createElement(RemoveButton, { country: selectedCountry })
    );
}

function RemoveButton(_ref) {
    var country = _ref.country;

    var deleteCountry = useCallback(function (c) {
        $.ajax({
            url: "http://157.245.170.229/Countries/" + country,
            type: 'DELETE',
            success: function success(result) {
                console.log("Removed");
            },
            statusCode: {
                400: function _() {
                    console.log("Country not found");
                }
            }
        });
        var localStorage = window.localStorage;
        localStorage.removeItem(country);
        setCountries.useState(countryNames());
    }, [country]);

    return React.createElement(
        'button',
        { onClick: function onClick() {
                deleteCountry(country);
            } },
        'Delete ',
        country
    );
}

export default Form;