import React, { Component } from "react";
import Employees from "./Employees.js";
import Search from "./Search.js";
import API from "../utils/API";

class Directory extends Component {
  state = {
    employees: [],
    employeeSort: [],
    search: "",
    sorted: false,
  };

  componentDidMount = () => {
    API.search().then((results) => {
      this.setState({
        employees: results.data.results,
      });
    });
  };

  sortEmployees = () => {
    let { employees, search, } = this.state;
    let employeeSort = employees.filter((sorted) => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ employeeSort });
  };

  newSort = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmployees();
      this.setState({ sorted: true });
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <h2>Employee Directory</h2>
          <br></br>
          <Search name="search" newSort={this.newSort} label="Search" />
        </div>
        <br></br>
        <div>
          <table className="table table-light table-striped table-hover table-bordered table-condensed">
            <thead className="thead">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {!this.state.sorted
                ? this.state.employees.map((employee) => (
                    <Employees
                      key={employee.id.value}
                      icon={employee.picture.medium}
                      firstName={employee.name.first}
                      lastName={employee.name.last}
                      email={employee.email}
                      phone={employee.phone}
                      dob={employee.dob.date}
                      address={
                        employee.location.street.number +
                        " " +
                        employee.location.street.name +
                        ", " +
                        employee.location.city +
                        ", " +
                        employee.location.state +
                        " " +
                        employee.location.postcode
                      }
                    />
                  ))
                : this.state.employeeSort.map((employee) => (
                    <Employees
                      key={employee.id.value}
                      firstName={employee.name.first}
                      lastName={employee.name.last}
                      phone={employee.phone}
                      email={employee.email}
                      icon={employee.picture.medium}
                      dob={employee.dob.date}
                      address={
                        employee.location.street.number +
                        employee.location.street.name
                      }
                    />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default Directory;
