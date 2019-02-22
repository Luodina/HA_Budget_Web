import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Table } from 'reactstrap';
import OSRenderer from "./Components/osRenderer";
import OSEditor from "./Components/osEditor";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import ModalAddNew from './Components/Modal';

import { sysConfig } from "../../_config";
import axios from 'axios'

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
      dimData: 
        [{
          "BudgetNature": "Budget Nature",
          "BudgetType": "Total Revised",
          "Entity": "HKEC",
          "Analytical": "Analytical",
          "Type": "No_Type",
          "Section": "No_Type",field1: "111",
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
        }],
      
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
      monthData: 
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
      
    }
    this.AddRow = this.AddRow.bind(this);
    this.onExitModal = this.onExitModal.bind(this);
    this.onGridReady = this.onGridReady.bind(this);

  }

  componentDidMount() {
    let response = {
      "id": 1,
      "name": "Entity",
      "children": [{
              "id": 2,
              "name": "Government",
              "children": [{
                      "id": 5,
                      "name": "COR",
                      "children": [{
                              "id": 11,
                              "name": "Add'l Recurrent Subvention (COR)",
                              "children": []
                          },
                          {
                              "id": 12,
                              "name": "CMIT",
                              "children": []
                          },
                          {
                              "id": 13,
                              "name": "COR CBV",
                              "children": []
                          },
                          {
                              "id": 14,
                              "name": "COR CWRF 8100MX",
                              "children": []
                          },
                          {
                              "id": 15,
                              "name": "COR CWRF F&E",
                              "children": []
                          },
                          {
                              "id": 16,
                              "name": "COR CWRF H710 e HR",
                              "children": []
                          },
                          {
                              "id": 17,
                              "name": "COR CWRF Works",
                              "children": []
                          },
                          {
                              "id": 18,
                              "name": "COR ITBV",
                              "children": []
                          },
                          {
                              "id": 21,
                              "name": "HCVS",
                              "children": []
                          },
                          {
                              "id": 27,
                              "name": "Recurrent Subvention per COR",
                              "children": []
                          },
                          {
                              "id": 29,
                              "name": "Smart ID Card",
                              "children": []
                          },
                          {
                              "id": 30,
                              "name": "Supplementary Recurrent Subvention (COR)",
                              "children": []
                          }
                      ]
                  },
                  {
                      "id": 7,
                      "name": "NCOR",
                      "children": [{
                              "id": 10,
                              "name": "ASD",
                              "children": []
                          },
                          {
                              "id": 19,
                              "name": "DH",
                              "children": []
                          },
                          {
                              "id": 20,
                              "name": "FHB",
                              "children": []
                          },
                          {
                              "id": 25,
                              "name": "LWB",
                              "children": []
                          },
                          {
                              "id": 26,
                              "name": "Other Govt Dept",
                              "children": []
                          },
                          {
                              "id": 28,
                              "name": "SWD",
                              "children": []
                          },
                          {
                              "id": 31,
                              "name": "TRY",
                              "children": []
                          }
                      ]
                  },
                  {
                      "id": 8,
                      "name": "Other Source",
                      "children": [{
                          "id": 22,
                          "name": "HLISS",
                          "children": []
                      }]
                  }
              ]
          },
          {
              "id": 3,
              "name": "HA Overall",
              "children": [{
                  "id": 6,
                  "name": "Corporate",
                  "children": [{
                          "id": 9,
                          "name": "811",
                          "children": []
                      },
                      {
                          "id": 23,
                          "name": "HO Institution",
                          "children": [{
                                  "id": 32,
                                  "name": "Consolidation",
                                  "children": [{
                                          "id": 89,
                                          "name": "890",
                                          "children": []
                                      },
                                      {
                                          "id": 90,
                                          "name": "999",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 33,
                                  "name": "Entity - Central Program",
                                  "children": [{
                                      "id": 97,
                                      "name": "QEPET",
                                      "children": []
                                  }]
                              },
                              {
                                  "id": 34,
                                  "name": "HAHO Total",
                                  "children": [{
                                          "id": 91,
                                          "name": "CF",
                                          "children": []
                                      },
                                      {
                                          "id": 94,
                                          "name": "HAHO",
                                          "children": [{
                                                  "id": 108,
                                                  "name": "802",
                                                  "children": []
                                              },
                                              {
                                                  "id": 113,
                                                  "name": "HAHO Excl HLISS",
                                                  "children": [{
                                                          "id": 114,
                                                          "name": "801",
                                                          "children": []
                                                      },
                                                      {
                                                          "id": 115,
                                                          "name": "812",
                                                          "children": []
                                                      },
                                                      {
                                                          "id": 116,
                                                          "name": "VE-HCH",
                                                          "children": []
                                                      }
                                                  ]
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "id": 35,
                                  "name": "HAIT Total",
                                  "children": [{
                                          "id": 86,
                                          "name": "803",
                                          "children": []
                                      },
                                      {
                                          "id": 87,
                                          "name": "809",
                                          "children": []
                                      },
                                      {
                                          "id": 88,
                                          "name": "810",
                                          "children": []
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "id": 24,
                          "name": "Hospital Cluster",
                          "children": [{
                                  "id": 36,
                                  "name": "HKEC",
                                  "children": [{
                                          "id": 43,
                                          "name": "101",
                                          "children": []
                                      },
                                      {
                                          "id": 44,
                                          "name": "102",
                                          "children": []
                                      },
                                      {
                                          "id": 45,
                                          "name": "103",
                                          "children": []
                                      },
                                      {
                                          "id": 46,
                                          "name": "104",
                                          "children": []
                                      },
                                      {
                                          "id": 47,
                                          "name": "105",
                                          "children": []
                                      },
                                      {
                                          "id": 48,
                                          "name": "106",
                                          "children": []
                                      },
                                      {
                                          "id": 49,
                                          "name": "107",
                                          "children": []
                                      },
                                      {
                                          "id": 50,
                                          "name": "108",
                                          "children": []
                                      },
                                      {
                                          "id": 92,
                                          "name": "GOPCH",
                                          "children": []
                                      },
                                      {
                                          "id": 96,
                                          "name": "OPHTH",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 37,
                                  "name": "HKWC",
                                  "children": [{
                                          "id": 51,
                                          "name": "201",
                                          "children": []
                                      },
                                      {
                                          "id": 52,
                                          "name": "202",
                                          "children": []
                                      },
                                      {
                                          "id": 53,
                                          "name": "203",
                                          "children": []
                                      },
                                      {
                                          "id": 54,
                                          "name": "204",
                                          "children": []
                                      },
                                      {
                                          "id": 55,
                                          "name": "205",
                                          "children": []
                                      },
                                      {
                                          "id": 56,
                                          "name": "206",
                                          "children": []
                                      },
                                      {
                                          "id": 57,
                                          "name": "207",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 38,
                                  "name": "KCC",
                                  "children": [{
                                          "id": 58,
                                          "name": "311",
                                          "children": []
                                      },
                                      {
                                          "id": 95,
                                          "name": "KCC excluding HKCH",
                                          "children": [{
                                                  "id": 98,
                                                  "name": "301",
                                                  "children": []
                                              },
                                              {
                                                  "id": 99,
                                                  "name": "302",
                                                  "children": []
                                              },
                                              {
                                                  "id": 100,
                                                  "name": "303",
                                                  "children": []
                                              },
                                              {
                                                  "id": 101,
                                                  "name": "304",
                                                  "children": []
                                              },
                                              {
                                                  "id": 102,
                                                  "name": "305",
                                                  "children": []
                                              },
                                              {
                                                  "id": 103,
                                                  "name": "306",
                                                  "children": []
                                              },
                                              {
                                                  "id": 104,
                                                  "name": "307",
                                                  "children": []
                                              },
                                              {
                                                  "id": 105,
                                                  "name": "308",
                                                  "children": []
                                              },
                                              {
                                                  "id": 106,
                                                  "name": "309",
                                                  "children": []
                                              },
                                              {
                                                  "id": 107,
                                                  "name": "310",
                                                  "children": []
                                              },
                                              {
                                                  "id": 109,
                                                  "name": "BMDR",
                                                  "children": []
                                              },
                                              {
                                                  "id": 110,
                                                  "name": "GOPKC",
                                                  "children": []
                                              },
                                              {
                                                  "id": 111,
                                                  "name": "GOPKT",
                                                  "children": []
                                              },
                                              {
                                                  "id": 112,
                                                  "name": "GOPWM",
                                                  "children": []
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "id": 39,
                                  "name": "KEC",
                                  "children": [{
                                          "id": 59,
                                          "name": "401",
                                          "children": []
                                      },
                                      {
                                          "id": 60,
                                          "name": "402",
                                          "children": []
                                      },
                                      {
                                          "id": 61,
                                          "name": "403",
                                          "children": []
                                      },
                                      {
                                          "id": 62,
                                          "name": "404",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 40,
                                  "name": "KWC",
                                  "children": [{
                                          "id": 63,
                                          "name": "501",
                                          "children": []
                                      },
                                      {
                                          "id": 64,
                                          "name": "502",
                                          "children": []
                                      },
                                      {
                                          "id": 65,
                                          "name": "503",
                                          "children": []
                                      },
                                      {
                                          "id": 66,
                                          "name": "504",
                                          "children": []
                                      },
                                      {
                                          "id": 67,
                                          "name": "505",
                                          "children": []
                                      },
                                      {
                                          "id": 68,
                                          "name": "506",
                                          "children": []
                                      },
                                      {
                                          "id": 69,
                                          "name": "507",
                                          "children": []
                                      },
                                      {
                                          "id": 70,
                                          "name": "508",
                                          "children": []
                                      },
                                      {
                                          "id": 71,
                                          "name": "509",
                                          "children": []
                                      },
                                      {
                                          "id": 93,
                                          "name": "GOPCW",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 41,
                                  "name": "NTEC",
                                  "children": [{
                                          "id": 72,
                                          "name": "601",
                                          "children": []
                                      },
                                      {
                                          "id": 73,
                                          "name": "602",
                                          "children": []
                                      },
                                      {
                                          "id": 74,
                                          "name": "603",
                                          "children": []
                                      },
                                      {
                                          "id": 75,
                                          "name": "604",
                                          "children": []
                                      },
                                      {
                                          "id": 76,
                                          "name": "605",
                                          "children": []
                                      },
                                      {
                                          "id": 77,
                                          "name": "606",
                                          "children": []
                                      },
                                      {
                                          "id": 78,
                                          "name": "607",
                                          "children": []
                                      },
                                      {
                                          "id": 79,
                                          "name": "608",
                                          "children": []
                                      }
                                  ]
                              },
                              {
                                  "id": 42,
                                  "name": "NTWC",
                                  "children": [{
                                          "id": 80,
                                          "name": "701",
                                          "children": []
                                      },
                                      {
                                          "id": 81,
                                          "name": "702",
                                          "children": []
                                      },
                                      {
                                          "id": 82,
                                          "name": "703",
                                          "children": []
                                      },
                                      {
                                          "id": 83,
                                          "name": "704",
                                          "children": []
                                      },
                                      {
                                          "id": 84,
                                          "name": "705",
                                          "children": []
                                      },
                                      {
                                          "id": 85,
                                          "name": "706",
                                          "children": []
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              }]
          },
          {
              "id": 4,
              "name": "No_Entity",
              "children": []
          }
      ]
  }

  function getLeafNodes(leafNodes, obj, dimension){   
    if(obj.children && obj.children.length>0){
      obj.children.forEach(function(child){getLeafNodes(leafNodes,child, dimension)});
    } else{
      leafNodes.push({ value: obj.name, label: obj.name, dim:dimension }  );
    }
  } 

  let leafNodesEntity = [];
  let leafNodesType= [];
  let a="Entity";
  getLeafNodes(leafNodesEntity, response,"Entity");
  a="Type";
  getLeafNodes(leafNodesType, response,"Type")
  //console.log("!!!!!!!",leafNodes)

  this.setState({ data: {
    "Entity": leafNodesEntity,
    "Type":leafNodesType
  }
  })
    // axios({
    //   method: 'get',
    //   // headers: {
    //   //   'Accept': 'application/json, text/plain, */*',
    //   //   'Content-Type': 'application/json',
    //   //   'Origin':window.location.origin,
    //   //   // 'TSRAuth':"xlNIOEWONXVLSDFOiuLSKNLIUAD",
    //   //   "X-Requested-With":"XMLHttpRequest",
    //   //   "Access-Control-Allow-Origin": "*",
    //   //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    //   // },
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

  onExitModal(mode,payload) {
    console.log("here we are ExitModal", mode)
    if (mode === "add") {
      //let a = payload
      let qqq=this.state.dimData;
      qqq.push(payload);
      console.log("here we are ExitModal", qqq)
      this.setState({
        dimData: qqq
      })
      this.gridApi.updateRowData({ add: [payload] });
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
    
    // let tmp = {...this.state.dimData,...this.state.monthData};
    let rowData = this.state.dimData;
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
                      onExitModal={this.onExitModal}
                      data ={this.state.data} />
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