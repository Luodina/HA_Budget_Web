import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Table, Label } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ModalAddNew from './Components/Modal';

import { sysConfig } from "../../_config";
import axios from 'axios'

const style = { "color": "rgba(0, 0, 0, 0.54)" };
class Cluster extends Component {
    constructor(props) {
        super(props);
        let mw = 70;
        let dw = 100;
        this.state = {
            isOpen: false,
            rowSelection: "multiple",
            dimensions: [{
                headerName: "Budget Nature",
                field: "budgetnature",
                width: dw,
                editable: true,
            },
            { headerName: "Budget Type", field: "budgettype", width: dw, editable: true, "cellEditor": "agTextCellEditor" },
            { headerName: "Entity", field: "entity", width: dw, editable: true, "cellEditor": "agTextCellEditor" },
            { headerName: "Analytical", field: "analytical", width: dw, editable: true, filter: 'agTextColumnFilter' },
            { headerName: "Section", field: "section", width: dw, editable: true, filter: 'agTextColumnFilter' },
            { headerName: "Type", field: "type", width: dw, editable: true, filter: 'agTextColumnFilter' },
            ],
            dimData: [],
            defDimData: {
                "scenario": "FebBudget",
                "datatype": "IncrementalAccrual",
                "fund": "Fund 01",
                "approvalstatus": "Approved",
                "itemkey": "Input",
                "projref": "No_ProjRef",
                "budgetversion": "Cluster",
                "budgetnature": "R",
                "entity": "HKEC",
                "analytical": "00000",
                "section": "7007000",
                "type": "00",
                "account": "484990",
                "years": "FY18",
                "budgetholder": "No_BudgetHolder",
                "budgettype": "Total Revised",
                "apr": 0,
                "may": 0,
                "jun": 0,
                "jul": 0,
                "aug": 0,
                "sep": 0,
                "oct": 0,
                "nov": 0,
                "dec": 0,
                "jan": 0,
                "feb": 0,
                "mar": 0,
                "p13": 0,
                "p14": 0
            },
            monthes: [
                { headerName: "apr", field: "apr", width: mw, editable: true },
                { headerName: "may", field: "may", width: mw, editable: true },
                { headerName: "jun", field: "jun", width: mw, editable: true },
                { headerName: "jul", field: "jul", width: mw, editable: true },
                { headerName: "aug", field: "aug", width: mw, editable: true },
                { headerName: "sep", field: "sep", width: mw, editable: true },
                { headerName: "oct", field: "oct", width: mw, editable: true },
                { headerName: "nov", field: "nov", width: mw, editable: true },
                { headerName: "dec", field: "dec", width: mw, editable: true },
                { headerName: "jan", field: "jan", width: mw, editable: true },
                { headerName: "feb", field: "feb", width: mw, editable: true },
                { headerName: "mar", field: "mar", width: mw, editable: true },
                {
                    headerName: "Total",
                    field: "total",
                    width: dw,
                    pinned: 'right',
                    cellClass: "number-cell",
                    valueGetter: function monthSumGetter(params) {
                        let total = Number(params.data.apr) + Number(params.data.may) + Number(params.data.jun) +
                            Number(params.data.jul) + Number(params.data.aug) + Number(params.data.sep) +
                            Number(params.data.oct) + Number(params.data.nov) + Number(params.data.dec) +
                            Number(params.data.jan) + Number(params.data.feb) + Number(params.data.mar);
                        return total;
                    }
                },
            ],
            budget: 0,
            adjustment: 0,
            corpTotal: 0,
            clusterTotal: 0,
        }
        this.onAddRow = this.onAddRow.bind(this);
        this.onExitModal = this.onExitModal.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this.onRemoveSelected = this.onRemoveSelected.bind(this);
        this.getAdjustment = this.getAdjustment.bind(this);
        this.onSave = this.onSave.bind(this)
    }

    componentDidMount() {
        function getLeafNodes(leafNodes, obj, dimension) {
            if (obj.children && obj.children.length > 0) {
                obj.children.forEach(function (child) { getLeafNodes(leafNodes, child, dimension) });
            } else {
                leafNodes.push({ value: obj.name, label: obj.name, dim: dimension });
            }
        }

        axios({
            method: 'get',
            url: sysConfig.API_PREFIX + '/api/data'
        }).then(response => {
            let tmp = response.data;
            this.setState({
                dimData: tmp.recBgtInputs,
                clusterTotal: tmp.clusterTotal,
                corpTotal: tmp.corpTotal
            });
            return axios({
                method: 'get',
                url: sysConfig.API_PREFIX + '/api/data/dimensions/'
            });
        }).then(response => {
            let tmp = response.data;
            let leafNodes = {
                "account": [],
                "analytical": [],
                "budgetnature": [],
                "budgettype": [],
                "entity": [],
                "section": [],
                "type": [],
            }
            Object.keys(tmp["dimensions"]).forEach(key => {
                console.log(key);
                for (let i = 0; i < tmp["dimensions"][key].length; i++) {
                    getLeafNodes(leafNodes[key], tmp["dimensions"][key][i], key);
                }
            });
            console.log("leafNodes", leafNodes);
            // getLeafNodes(leafNodes["account"], tmp["dimensions"]["account"], "account");
            // getLeafNodes(leafNodes["analytical"], tmp["dimensions"]["analytical"], "analytical")
            // getLeafNodes(leafNodes["budgetnature"], tmp["dimensions"]["budgetnature"], "budgetnature");
            // getLeafNodes(leafNodes["budgettype"], tmp["dimensions"]["budgettype"], "budgettype")
            // getLeafNodes(leafNodes["entity"], tmp["dimensions"]["entity"], "entity");
            // getLeafNodes(leafNodes["section"], tmp["dimensions"]["section"], "section")
            // getLeafNodes(leafNodes["type"], tmp["dimensions"]["type"], "type")
            this.setState({
                data: leafNodes
            })
        })
    }

    onSave() {
        console.log("this.state.dimData", this.state.dimData);
        let tmp = this.state.dimData;
        let newReq = tmp.filter(item => {
            return !item.id;
        });
        let updReq = tmp.filter(item => {
            return item.id;
        });
        console.log("new======>", newReq, "updated======>", updReq);
        if (newReq.length > 0) {
            axios.post(sysConfig.API_PREFIX + '/api/data',
                { new: newReq, updated: updReq })
                .then(response => {
                    console.log("POST response", response);
                    if (response.status) {
                        return axios({
                            method: 'get',
                            url: sysConfig.API_PREFIX + '/api/data'
                        });
                    }
                })
                .then((response) => {
                    console.log("GET data", response.data);
                    let tmp = response.data;
                    this.setState({
                        dimData: tmp.recBgtInputs,
                        clusterTotal: tmp.clusterTotal,
                        corpTotal: tmp.corpTotal
                    })
                })
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //this.gridColumnApi.sizeColumnsToFit();
    }

    onAddRow() {
        this.setState({
            isOpen: true
        })
    }

    getAdjustment() {
        let adjSum = 0;
        this.gridApi.forEachNode(function (params) {
            let sum = Number(params.data.apr) + Number(params.data.may) + Number(params.data.jun) +
                Number(params.data.jul) + Number(params.data.aug) + Number(params.data.sep) +
                Number(params.data.oct) + Number(params.data.nov) + Number(params.data.dec) +
                Number(params.data.jan) + Number(params.data.feb) + Number(params.data.mar);
            adjSum = adjSum + sum;
        });
        console.log("adjSum Data:", adjSum);
        let newBgt = Number(this.state.clusterTotal) + adjSum;
        this.setState({
            adjustment: adjSum,
            budget: newBgt
        })
    }

    onRemoveSelected() {
        let selectedData = this.gridApi.getSelectedRows();
        console.log(selectedData);
        this.gridApi.updateRowData({ remove: selectedData });
        this.getAdjustment();
    }

    onExitModal(mode, payload) {
        console.log("here we are ExitModal", mode, payload)
        if (mode === "add") {
            let newDimData = this.state.dimData;
            let newItem = { ...this.state.defDimData, ...payload }
            newDimData.push(newItem);
            console.log("here we are ExitModal", newItem)
            this.setState({
                dimData: newDimData,
                total: 233
            })
            this.gridApi.updateRowData({ add: [newItem] });
        }
        this.setState({
            isOpen: false
        });
    }

    render() {
        let columnDefs = this.state.dimensions;
        columnDefs = columnDefs.concat(this.state.monthes);
        let rowData = this.state.dimData;
        return (
            <div className="animated fadeIn" >
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader>
                                <div>
                                    <h5 style={style} > Cluster Budget Input Form </h5> </div> </CardHeader> <CardBody>
                                <Row>
                                    <Col xs="12" >
                                        <Table borderless >
                                            <thead >
                                            </thead>
                                            <tbody >
                                                <tr>
                                                    <th scope="row" style={style} > Fund: </th>
                                                    <td > Fund 01 </td>
                                                    <th scope="row" style={style} > Scenario: </th>
                                                    <td> FebBudget </td>
                                                </tr>
                                                <tr style={style} >
                                                    <th colSpan="10" > Corporate Budget </th>
                                                </tr >
                                                <tr>
                                                    <th scope="row" style={style} > DataType: </th>
                                                    <td > IncrementalAccrual </td>
                                                    <th scope="row" style={style} > Budget Type: </th>
                                                    <td > Total Revised </td>
                                                    <th scope="row" style={style} > Entity: </th>
                                                    <td > HKEC </td>
                                                    <th scope="row" style={style} > Year: </th>
                                                    <td > 2018 </td>
                                                    <th scope="row" style={style} > Vesrion: </th>
                                                    <td > Corporate Version </td>
                                                </tr >
                                                <tr >
                                                    <th scope="row" style={style} > Total Corp Level Budget </th>
                                                    <td > {this.state.corpTotal} </td>
                                                </tr >
                                                <tr style={style} >
                                                    <th colSpan="10" > Cluster Budget </th>
                                                </tr >
                                            </tbody>
                                        </Table >
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" >
                                        <Button style={{ "float": "right" }} color="success" onClick={() => this.onSave()} > Save </Button>{' '}
                                        <Button style={{ "float": "right", "marginRight": "10px" }} color="danger" onClick={() => this.onRemoveSelected()} > Delete Row </Button>{' '}
                                        <Button style={{ "float": "right", "marginRight": "10px" }} color="primary" onClick={() => this.onAddRow()} > Add Row </Button>{' '}
                                    </Col > {
                                        this.state.isOpen &&
                                        <ModalAddNew isOpen={this.state.isOpen}
                                            dimensions={this.state.dimensions}
                                            onExitModal={this.onExitModal}
                                            data={this.state.data}
                                        />}
                                </Row>
                                <Row style={{ "marginTop": "20px" }} >
                                    <Col xs="12" >
                                        <div className="ag-theme-balham" style={{
                                            "minWidth": "100px",
                                            "width": "100%",
                                            "height": "300px"
                                        }} >
                                            <AgGridReact
                                                rowSelection={this.state.rowSelection}
                                                onGridReady={this.onGridReady}
                                                columnDefs={columnDefs}
                                                rowMultiSelectWithClick={true}
                                                onCellEditingStarted={function (event) {
                                                    console.log('cellEditingStarted');
                                                }}
                                                onCellEditingStopped={this.getAdjustment}
                                                defaultColDef={
                                                    { filter: true }
                                                }
                                                rowData={rowData} >
                                            </AgGridReact>
                                        </div >
                                    </Col>
                                </Row>
                                <Row style={{ "marginTop": "20px" }} >
                                    <Col xs="7" >
                                    </Col>
                                    <Col xs="3" style={{ "color": "rgba(0, 0, 0, 0.54)" }} >
                                        <Label for="balance" > Current Cluster Level Balance: </Label>
                                        <Label for="adjustment" > Total Cluster Adjustment: </Label>
                                        <Label for="budget" > Total Cluster Level Budget: </Label>
                                    </Col>
                                    <Col xs="2" >
                                        <div style={{ "marginBottom": "0.5rem" }} > {this.state.clusterTotal} </div>
                                        <div style={{ "marginBottom": "0.5rem" }} > {this.state.adjustment} </div>
                                        <div style={{ "marginBottom": "0.5rem" }} > {this.state.budget}  </div>
                                    </Col >
                                </Row>
                            </CardBody >
                        </Card>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Cluster;
