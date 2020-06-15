var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';
import CountryNames from './countryNames.js';
function Update(props) {
    var _useState = useState(CountryNames()),
        _useState2 = _slicedToArray(_useState, 2),
        myKeys = _useState2[0],
        setKeys = _useState2[1];

    return React.createElement(
        'form',
        null,
        React.createElement(
            'label',
            null,
            React.createElement(
                'select',
                null,
                myKeys.map(function (item) {
                    return React.createElement(CountrySelect, { name: item });
                })
            )
        )
    );
}

function CountrySelect(props) {
    return React.createElement(
        'option',
        { value: props.name },
        props.name
    );
}
//domElement = document.getElementById("update_container");
//ReactDOM.render(<Update/>,domElement);
export default Update;