import React from "react";

const Employees = (props) => {
  function formatDate(date) {
    let dateArray = date.split('-');
    let dayArray = dateArray[2].split('T');
    let month = dateArray[1];
    let day = dayArray[0];
    let year = dateArray[0];
    let formattedDate = [month, day, year].join('-');

    return formattedDate;
  }

  let dateOfBirth = formatDate(props.dob);

  return (
    <tr className="tr">
      <td>
        <img alt={props.firstName} src={props.icon} />
      </td>
      <td>
        {props.firstName} {props.lastName}
      </td>
      <td>{props.email}</td>
      <td>{props.phone} </td>
      <td>{dateOfBirth}</td>
      <td>{props.address}</td>
    </tr>
  );
};

export default Employees;
