import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Table, Label } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ModalAddNew from './Components/Modal';

import { sysConfig } from "../../_config";
import axios from 'axios'

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
            defDimData:{
                "budgetnature": "Budget Nature",
                "budgettype": "Total Revised",
                "entity": "HKEC",
                "analytical": "Analytical",
                "section": "No_Type",
                "type": "No_Type",
                "apr":0,
                "may":0,
                "jun":0,
                "jul":0,
                "aug":0,
                "sep":0,
                "oct":0,
                "nov":0,
                "dec":0,
                "jan":0,
                "feb":0,
                "mar":0    
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
                        let total =Number(params.data.apr) + Number(params.data.may) + Number(params.data.jun) +
                            Number(params.data.jul) + Number(params.data.aug) + Number(params.data.sep) +
                            Number(params.data.oct) + Number(params.data.nov) + Number(params.data.dec) +
                            Number(params.data.jan) + Number(params.data.feb) + Number(params.data.mar);
                        return total;
                    }
                },
            ],
            budget: 0,
            adjustment: 0,
            balance: 0
        }
        this.onAddRow = this.onAddRow.bind(this);
        this.onExitModal = this.onExitModal.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this.onRemoveSelected = this.onRemoveSelected.bind(this);
        this.getAdjustment = this.getAdjustment.bind(this);
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
        let clusterData = 
        [
            {"id":1854,"version":0,
            "createdAt":"2019-02-14T17:56:16",
            "updatedAt":"2019-02-14T17:56:16",
            "scenario":"FebBudget",
            "datatype":"OpeningAccrual",
            "fund":"Fund 01",
            "approvalstatus":"Approved",
            "itemkey":"Input",
            "projref":"No_ProjRef",
            "budgetversion":"Cluster",
            "budgetnature":"R",
            "budgettype":"Rev",
            "entity":"703","analytical":"32001","section":"9987000","type":"00","account":"419990",
            "years":"FY18",
            "budgetholder":"No_BudgetHolder",
            "apr":0,"may":0,"jun":0,"jul":0,"aug":0,"sep":0,"oct":0,"nov":0,"dec":0,"jan":0,"feb":0,"mar":195.2,"p13":0,"p14":0
            },

            {"id":1858,"version":0,
            "createdAt":"2019-02-14T17:56:16",
            "updatedAt":"2019-02-14T17:56:16",
            "scenario":"FebBudget","datatype":"OpeningAccrual",
            "fund":"Fund 01","approvalstatus":"Approved",
            "itemkey":"Input","projref":"No_ProjRef",
            "budgetversion":"Cluster","budgetnature":"R",
            "budgettype":"Rev","entity":"203","analytical":"31741",
            "section":"7007000","type":"00","account":"359990",
            "years":"FY18","budgetholder":"No_BudgetHolder",
            "apr":6,"may":0,"jun":6,"jul":6,"aug":0,"sep":0,"oct":0,"nov":0,"dec":0,"jan":0,"feb":0,"mar":30,"p13":0,"p14":0
            },

            {"id":1880,"version":0,"createdAt":"2019-02-14T17:56:16","updatedAt":"2019-02-14T17:56:16","scenario":"FebBudget","datatype":"OpeningAccrual","fund":"Fund 01","approvalstatus":"Approved","itemkey":"Input","projref":"No_ProjRef","budgetversion":"Cluster","budgetnature":"R","budgettype":"AllocAdj","entity":"206","analytical":"45004","section":"9987000","type":"00","account":"359990","years":"FY18","budgetholder":"No_BudgetHolder",
            "apr":0,"may":0,"jun":0,"jul":0,"aug":0,"sep":0,"oct":0,"nov":7200,"dec":7200,"jan":-14400,
            "feb":0,"mar":0,"p13":0,"p14":0},{"id":2068,"version":0,"createdAt":"2019-02-14T17:56:16",
            "updatedAt":"2019-02-14T17:56:16","scenario":"FebBudget","datatype":"OpeningAccrual","fund":"Fund 01","approvalstatus":"Approved","itemkey":"Input",
            "projref":"No_ProjRef","budgetversion":"Cluster","budgetnature":"O","budgettype":"Org","entity":"103","analytical":"47077",
            "section":"9987000","type":"31","account":"221100","years":"FY18","budgetholder":"No_BudgetHolder","apr":150.787,"may":150.787,
            "jun":150.787,"jul":150.787,"aug":150.787,"sep":150.787,"oct":150.787,"nov":150.787,"dec":150.787,
            "jan":150.787,"feb":150.787,"mar":150.839,"p13":0,"p14":0},

            {"id":2072,"version":0,"createdAt":"2019-02-14T17:56:16","updatedAt":"2019-02-14T17:56:16",
            "scenario":"FebBudget","datatype":"OpeningAccrual","fund":"Fund 01","approvalstatus":"Approved",
            "itemkey":"Input","projref":"No_ProjRef","budgetversion":"Cluster","budgetnature":"R","budgettype":"Rev",
            "entity":"203","analytical":"44999","section":"9987001","type":"24","account":"221100","years":"FY18",
            "budgetholder":"No_BudgetHolder",
            "apr":0,"may":0,"jun":0,"jul":0,"aug":623.1,"sep":124.62,"oct":124.62,"nov":124.62,"dec":124.62,"jan":124.62,"feb":124.62,
            "mar":124.62,"p13":0,"p14":0}
        ];
        this.setState({dimData:clusterData})

        function getLeafNodes(leafNodes, obj, dimension) {
            if (obj.children && obj.children.length > 0) {
                obj.children.forEach(function(child) { getLeafNodes(leafNodes, child, dimension) });
            } else {
                leafNodes.push({ value: obj.name, label: obj.name, dim: dimension });
            }
        }

        let leafNodesEntity = [];
        let leafNodesType = [];
        
        getLeafNodes(leafNodesEntity, response, response["name"].toLowerCase());
        getLeafNodes(leafNodesType, response, "type")
       
        this.setState({
                data: {
                    "entity": leafNodesEntity,
                    "type": leafNodesType
                }
            })
        axios({
            method: 'get',
            url: sysConfig.API_PREFIX + '/api/data'
        }).then(response => {
            console.log("response.data", response)
            //this.setState({ data: response })
        })
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

    getAdjustment(){
        let adjSum = 0;
        this.gridApi.forEachNode(function(params) {
            let sum =Number(params.data.apr) + Number(params.data.may) + Number(params.data.jun) +
            Number(params.data.jul) + Number(params.data.aug) + Number(params.data.sep) +
            Number(params.data.oct) + Number(params.data.nov) + Number(params.data.dec) +
            Number(params.data.jan) + Number(params.data.feb) + Number(params.data.mar);
            adjSum =adjSum+sum;
        });
        console.log("adjSum Data:", adjSum);
        let newBgt=Number(this.state.balance)+adjSum;
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
        // var rowData = [];
        // this.gridApi.forEachNode(function(node) {
        //     rowData.push(node.data);
        // });
    }

    onExitModal(mode, payload) {
        console.log("here we are ExitModal", mode, payload)
        if (mode === "add") {
            let newDimData = this.state.dimData;
            let newItem = {...this.state.defDimData, ...payload}
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
            <div className = "animated fadeIn" >
                <Row>
                    <Col xs = "12" >
                        <Card>
                            <CardHeader>
                            <div>
                            <h5 style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Cluster Budget Input Form </h5> </div> </CardHeader> <CardBody>
                                <Row>
                                    <Col xs = "12" >
                                        <Table borderless >
                                            <thead >
                                            </thead> 
                                            <tbody >
                                            <tr>
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Fund: </th> 
                                                <td > Fund 01 </td> 
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Scenario: </th> 
                                                <td> FebBudget </td> 
                                            </tr> 
                                            <tr style = {{ "color": "rgba(0, 0, 0, 0.54)" }} >
                                            <th colSpan = "10" > Corporate Budget </th> 
                                            </tr > 
                                            <tr>
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > DataType: </th> 
                                                <td > IncrementalAccrual </td> 
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Budget Type: </th> 
                                                <td > Total Revised </td> 
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Entity: </th> 
                                                <td > HKEC </td> 
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Year: </th> 
                                                <td > 2018 </td> 
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} > Vesrion: </th> 
                                                <td > Corporate Version </td> 
                                            </tr > 
                                            <tr >
                                                <th scope = "row" style = {{ "color": "rgba(0, 0, 0, 0.54)", "paddingRight": "0px" }} > Total Corp Level Budget : </th> 
                                                <td > 300 000 </td> 
                                            </tr > 
                                            <tr style = {{ "color": "rgba(0, 0, 0, 0.54)" }} >
                                            <th colSpan = "10" > Cluster Budget </th> 
                                        </tr > 
                                        </tbody> 
                                        </Table > 
                                    </Col> 
                                </Row> 
                                <Row>
                                    <Col xs = "12" >
                                        <Button style = {{ "float": "right" }} color = "danger" onClick = {() => this.onRemoveSelected()} > Delete Row </Button>{' '} 
                                        <Button style = {{ "float": "right", "marginRight": "10px" }} color = "primary" onClick = {() => this.onAddRow()} > Add Row </Button>{' '} 
                                    </Col > {
                                        this.state.isOpen &&
                                        <ModalAddNew isOpen = { this.state.isOpen }
                                            dimensions = { this.state.dimensions }
                                            onExitModal = { this.onExitModal }
                                            data = { this.state.data }
                                        />} 
                                </Row> 
                                <Row style = {{ "marginTop": "20px" }} >
                                    <Col xs = "12" >
                                        <div className = "ag-theme-balham" style = {{
                                                "minWidth": "100px",
                                                "width": "100%",
                                                "height": "300px"
                                            }} >
                                            <AgGridReact 
                                                rowSelection={this.state.rowSelection}
                                                onGridReady = { this.onGridReady }
                                                columnDefs = { columnDefs }
                                                rowMultiSelectWithClick={true}
                                                onCellEditingStarted= {function (event) {
                                                    console.log('cellEditingStarted');
                                                }}
                                                onCellEditingStopped = {this.getAdjustment}
                                                defaultColDef = {
                                                    { filter: true }
                                                }
                                                rowData = { rowData } >
                                            </AgGridReact> 
                                        </div > 
                                    </Col> 
                                </Row> 
                                <Row style = {{ "marginTop": "20px" }} >
                                    <Col xs = "7" >
                                    </Col> 
                                    <Col xs = "3" style = {{ "color": "rgba(0, 0, 0, 0.54)" }} >
                                        <Label for = "balance" > Current Cluster Level Balance: </Label>                         
                                        <Label for = "adjustment" > Total Cluster Adjustment: </Label>                        
                                        <Label for = "budget" > Total Cluster Level Budget: </Label>                            
                                    </Col> 
                                    <Col xs = "1" >
                                        <div style={{"marginBottom": "0.5rem"}} > {this.state.balance} </div>                         
                                        <div style={{"marginBottom": "0.5rem"}} > {this.state.adjustment} </div>                        
                                        <div style={{"marginBottom": "0.5rem"}} > {this.state.budget}  </div> 
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