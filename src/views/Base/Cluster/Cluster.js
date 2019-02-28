import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Table } from 'reactstrap';
// import OSRenderer from "./Components/osRenderer";
// import OSEditor from "./Components/osEditor";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import ModalAddNew from './Components/Modal';

// import { sysConfig } from "../../../_config";
// import axios from 'axios'

class Cluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      corporateCol: [
        { headerName: "Scenario", field: "Scenario" },
        { headerName: "DataType", field: "DataType" },
        { headerName: "Fund", field: "Fund" },
        { headerName: "ApprovalStatus", field: "ApprovalStatus" },
        { headerName: "ItemKey", field: "ItemKey" },
        { headerName: "ProjRef", field: "ProjRef" },
        { headerName: "Version", field: "Version" },
        { headerName: "Type", field: "Type" },
        { headerName: "Section", field: "Section" },
        { headerName: "Account", field: "Account" },
        { headerName: "Budget Nature", field: "BudgetNature" },
        { headerName: "Budget Type", field: "BudgetType" },
        { headerName: "Entity", field: "Entity" },
        { headerName: "Analytical", field: "Analytical" },
        { headerName: "Section", field: "Section1" },
        { headerName: "Year", field: "Year" },
        { headerName: "Period", field: "Period" },
        { headerName: "Government Level Total", field: "GovernmentLevelTotal" },
      ],
      corporateData: [
        {
          "Scenario": "SepBudget",
          "DataType": "IncrementalAccrual",
          "Fund": "Fund 01",
          "ApprovalStatus": "Approved",
          "ItemKey": "Input",
          "ProjRef": "Total Programs",
          "Version": "Corporate Version",
          "Type": "No_Type",
          "Section": "No_Section",
          "Account": "Lump Sum",
          "Budget Nature": "BudgetNature",
          "Budget Type": "Total Revised",
          "Entity": "HKEC",
          "Analytical": "Analytical",
          "Section1": "No_Type",
          "Year": "FY18",
          "Period": "YearTotal",
          "GovernmentLevelTotal": 300
        },
      ],
      dimensions: [
        {
          headerName: "Budget Nature",
          field: "BudgetNature",
          width: 150,
          editable: true,
          // cellRenderer : "osRenderer",
          //cellEditor : "osEditor"
        },
        { headerName: "Budget Type", field: "BudgetType", width: 100, editable: true, "cellEditor": "agTextCellEditor" },
        { headerName: "Entity", field: "Entity", width: 100, editable: true, "cellEditor": "agTextCellEditor" },
        { headerName: "Analytical", field: "Analytical", width: 100, editable: true, filter: 'agTextColumnFilter' },
        { headerName: "Section", field: "Section", width: 100, editable: true, filter: 'agTextColumnFilter' },
        { headerName: "Type", field: "Type", width: 100, editable: true, filter: 'agTextColumnFilter' },
      ],
      dimData: [
        {
          "BudgetNature": "Budget Nature",
          "BudgetType": "Total Revised",
          "Entity": "HKEC",
          "Analytical": "Analytical", "Type": "No_Type", "Section1": "No_Type",
        },
      ],
      monthes: [
        { headerName: "February", field: "field1", width: 100, editable: true, "cellEditor": "agTextCellEditor" },
        { headerName: "March", field: "field2", width: 100, editable: true, "cellEditor": "agTextCellEditor" },
        { headerName: "April", field: "field3", width: 100, editable: true, "cellEditor": "agTextCellEditor" },
        { headerName: "May", field: "field4", width: 100, editable: true },
        { headerName: "June", field: "field5", width: 100, editable: true },
        { headerName: "July", field: "field6", width: 100, editable: true },
        { headerName: "August", field: "field7", width: 100, editable: true },
        { headerName: "September", field: "field8", width: 100, editable: true },
        { headerName: "October", field: "field9", width: 100, editable: true },
        { headerName: "November", field: "field10", width: 100, editable: true },
        { headerName: "December", field: "field11", width: 100, editable: true },
        { headerName: "January", field: "field12", width: 100, editable: true }
      ],
      monthData: [
        {
          field1: "111",
          field2: "22",
          field3: "222",
          field4: "77",
          field5: "11",
          field6: "11",
          field7: "11",
          field8: "44",
          field9: "66",
          field10: "55",
          field11: "88",
          field12: "77",
        },
      ]
    }
    this.AddRow = this.AddRow.bind(this);
    this.onExitModal = this.onExitModal.bind(this);
    this.onGridReady = this.onGridReady.bind(this);

  }

  componentDidMount() {
    // axios({
    //   method: 'get',
    //   //url: "http://httpbin.org/bytes/5"
    //   //url: sysConfig.API_PREFIX + '/package-defination'
    //   url: sysConfig.API_PREFIX + '/api/data'
    // }).then(response => {
    //   console.log("response.data", response)
    //   this.setState({ data: response })
    // })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("ggggg")
    //this.gridColumnApi.sizeColumnsToFit();
  }

  AddRow() {
    console.log("here we are")
    this.setState({
      isOpen: true
    })
  }

  onExitModal(mode) {
    console.log("here we are ExitModal", mode)
    if (mode === "add") {
      this.gridApi.updateRowData({ add: [this.state.rowData[0]] });
    }
    // var newItem = createNewRowData();
    // var res = this.gridApi.updateRowData({ add: [newItem] });

    this.setState({
      isOpen: false
    })
  }
  render() {
    let columnDefs = this.state.dimensions;
    columnDefs = columnDefs.concat(this.state.monthes);
    let rowData = this.state.dimData;
    rowData = rowData.concat(this.state.monthData);
    console.log("columnDefs", columnDefs, "rowData", rowData);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <div>
                  <h5 style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Cluster Budget Input Form</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row >
                  <Col xs="12" >
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Fund:</th>
                          <td>Fund 01</td>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Scenario:</th>
                          <td>SepBudget</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ "color": "rgba(0, 0, 0, 0.54)" }}>
                          <th colSpan="10"> Corporate Budget </th>
                        </tr>
                        <tr>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>DataType:</th>
                          <td>IncrementalAccrual</td>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Budget Type:</th>
                          <td>Total Revised</td>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Entity:</th>
                          <td>HKEC</td>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Year:</th>
                          <td>2018</td>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)" }}>Vesrion:</th>
                          <td>Corporate Version</td>
                        </tr>
                        <tr>
                          <th scope="row" style={{ "color": "rgba(0, 0, 0, 0.54)", "paddingRight": "0px" }}>Government Level Total:</th>
                          <td>300 000</td>
                        </tr>
                        <tr style={{ "color": "rgba(0, 0, 0, 0.54)" }}>
                          <th colSpan="10"> Cluster Budget</th>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" >
                    <div className="ag-theme-balham" style={{
                      "minWidth": "100px",
                      "width": "100%",
                      "height": "300px",
                      "paddingLeft": "16px"
                    }}>
                      <AgGridReact
                        onGridReady={this.onGridReady}
                        columnDefs={columnDefs}
                        defaultColDef={{ filter: true }}
                        rowData={rowData}>
                      </AgGridReact>
                    </div>
                  </Col>
                </Row>
                <Row style={{ "marginTop": "20px" }}>
                  <Col xs="12">
                    <Button color="primary" onClick={() => this.AddRow()}>Add Row</Button>{' '}
                  </Col>
                  {
                    this.state.isOpen &&
                    <ModalAddNew isOpen={this.state.isOpen}
                      dimensions={this.state.dimensions}
                      onExitModal={this.onExitModal} />
                  }
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cluster;