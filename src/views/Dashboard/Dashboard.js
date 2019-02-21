import React, { Component, lazy, Suspense } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { Row, Col, Button } from 'reactstrap';
const service = {
  "width" : "100%",
  "height" : "300px"
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
          {headerName: "February", field: "field1"},
          {headerName: "March", field: "field2"},
          {headerName: "April", field: "field3"},
          {headerName: "May", field: "field4"},
          {headerName: "June", field: "field5"},
          {headerName: "July", field: "field6"},
          {headerName: "August", field: "field7"},
          {headerName: "September", field: "field8"},
          {headerName: "October", field: "field9"},
          {headerName: "November", field: "field10"},
          {headerName: "December", field: "field11"},
          {headerName: "January", field: "field12"}
      ],
      rowData: [
        {field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: "",
        field6: "",
        field7: "",
        field8: "",
        field9: "",
        field10: "",
        field11: "",
        field12: "",
      }, 
      ]
    }
  }

  render() {
    return (
      <div style={{background:"white"}}>
        <Row >
          <Col xs="12" >
            <div className="ag-theme-balham" style={service}>
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
              </AgGridReact>
            </div>
          </Col>
        </Row>
        <Row >
          <Col xs="12" >
            <div className="ag-theme-balham" style={service}>
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
              </AgGridReact>
            </div>
          </Col>
        </Row>
      </div>)
      }
    }
      
export default Dashboard;
