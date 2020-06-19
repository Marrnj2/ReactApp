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
import Form from "./form.js";

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(Form, null)
), document.getElementById('app'));