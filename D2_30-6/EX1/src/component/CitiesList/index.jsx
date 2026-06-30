import React from "react";
import "./citiesList.css"
import cities from"./cities.js"
const CitiesList = () => {
    
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Danh sách các thành phố",
    ),
    React.createElement(
      "table",
      {style: {width: '100%' , borderCollapse: 'collapse'}},
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "ID"),
          React.createElement("th", null, "Tên Thành Phố"),
          React.createElement("th", null, "Diện Tích"),
        ),
      ),
      React.createElement(
        "tbody",
        null,
        cities.map((city) =>
          React.createElement(
            "tr",
            null,
            React.createElement("th", null, city.id),
            React.createElement("th", null, city.name),
            React.createElement("th", null, city.area),
          ),
        ),
      ),
    ),
  );
}
 
export default CitiesList;