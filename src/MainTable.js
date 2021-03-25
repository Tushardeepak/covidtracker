import React from "react";
import "./table.css";

function MainTable({ countries }) {
  return (
    <div className="table">
      {countries?.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default MainTable;
