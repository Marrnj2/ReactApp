// import React from 'react';
// import ReactDOM from 'react-dom';
// import CountrySelect from 'public/javascripts/update.js'

// ReactDOM.render(
// <div><div>><CountrySelect/></div>,
// </div>,
// document.getElementById('app')
// );
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Update from "./update.js"
import Loader from "./loader.js"
import CountryNames from './countryNames.js'

ReactDOM.render(
<div><Loader/><Update/></div>,
document.getElementById('app')
);