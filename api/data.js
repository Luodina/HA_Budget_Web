const config = require("../config");
console.log(config)
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const corpTotalsUrl = config.API_PREFIX + "clusterFormCorpTotals";
const clusterTotalsUrl = config.API_PREFIX + "clusterFormClusterTotals";
const recBgtInputsUrl = config.API_PREFIX + "recurrentBudgetInputs";
const account = config.API_PREFIX_DIM + "accountNodes/";
const analytical = config.API_PREFIX_DIM + "analyticalNodes/";
const budgetnature = config.API_PREFIX_DIM + "budgetNatureNodes/";
const budgettype = config.API_PREFIX_DIM + "budgetTypeNodes/";
const entity = config.API_PREFIX_DIM + "entityNodes/";
const section = config.API_PREFIX_DIM + "sectionNodes/";
const type = config.API_PREFIX_DIM + "typeNodes/";

router.get('/dimensions/', (req, res) => {
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
    res.send({
        dimensions: {
            account: [],
            analytical: [],
            budgetnature: [],
            budgettype: [response, response, response],
            entity: [response],
            section: [],
            type: []
        }
    });
    // Promise.all([
    //     fetch(account).then(function (response) { return response.json() }),
    //     fetch(analytical).then(function (response) { return response.json() }),
    //     fetch(budgetnature).then(function (response) { return response.json() }),
    //     fetch(budgettype).then(function (response) { return response.json() }),
    //     fetch(entity).then(function (response) { return response.json() }),
    //     fetch(section).then(function (response) { return response.json() }),
    //     fetch(type).then(function (response) { return response.json() }),
    // ]).then(allResponses => {
    //     res.send({
    //         dimensions: {
    //             account: allResponses[0],
    //             analytical: allResponses[1],
    //             budgetnature: allResponses[2],
    //             budgettype: allResponses[3],
    //             entity: allResponses[4],
    //             section: allResponses[5],
    //             type: allResponses[6]
    //         }
    //     });
    // });
});

router.get('/', (req, res) => {

    let recBgtInputs = {
        "scenario": "FebBudget",
        "datatype": "IncrementalAccrual",
        "fund": "Fund 01",
        "approvalstatus": "Approved",
        "itemkey": "Input",
        "projref": "No_ProjRef",
        "budgetversion": "Cluster",
        "budgetnature": "R",
        "budgettype": "Transfer",
        "entity": "101",
        "analytical": "00000",
        "section": "7007000",
        "type": "00",
        "account": "484990",
        "years": "FY18",
        "budgetholder": "No_BudgetHolder",
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
        "feb": -100,
        "mar": -100,
        "p13": 0,
        "p14": 0
    }
    res.send({
        recBgtInputs: [recBgtInputs, recBgtInputs],
        clusterTotal: 220,
        corpTotal: 330,
    });
    // Promise.all([
    //     fetch(corpTotalsUrl).then(function (response) { return response.json() }),
    //     fetch(clusterTotalsUrl).then(function (response) { return response.json() }),
    //     fetch(recBgtInputsUrl).then(function (response) { return response.json() }),

    // ]).then(allResponses => {
    //     let corpTotals = allResponses[0].filter(item => {
    //         return (item["budgettype"] === "Total Revised" && item["entity"] === "HKEC");
    //     });
    //     console.log("total======>", corpTotals);
    //     let clusterTotals = allResponses[1].filter(item => {
    //         return (item["budgettype"] === "Total Revised" && item["entity"] === "HKEC");
    //     });
    //     console.log("total======>", clusterTotals, clusterTotals[0]["yearTotal"]);
    //     let recBgtInputs = allResponses[2];
    //     res.send({
    //         recBgtInputs: recBgtInputs,
    //         clusterTotal: clusterTotals[0]["yearTotal"],
    //         corpTotal: corpTotals[0]["yearTotal"],
    //     });
    // });
});

function getInputArr(data, method) {
    return fetch(recBgtInputsUrl,
        {
            method: method,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
}
router.post('/', (req, res) => {
    let newInputs = req.body.new;
    let uptInputs = req.body.updated;
    let promiseArr = [];
    for (let i = 0; i < newInputs.length; i++) {
        promiseArr.push(getInputArr(newInputs[i], 'POST'));
    }
    for (let i = 0; i < uptInputs.length; i++) {
        promiseArr.push(getInputArr(uptInputs[i], 'PUT'));
    }
    res.send({ result: promiseArr, status: true });
    // console.log("POST=====>>>>>", req.body.data)
    // let newInputs = req.body.new;
    // let uptInputs = req.body.updated;
    // let promiseArr = [];
    // for (let i = 0; i < newInputs.length; i++) {
    //     promiseArr.push(getInputArr(newInputs[i], 'POST'));
    // }
    // for (let i = 0; i < uptInputs.length; i++) {
    //     promiseArr.push(getInputArr(uptInputs[i], 'PUT'));
    // }
    // Promise.all(promiseArr).then(json => {
    //     console.log(json);
    //     res.send({ result: json, status: true });
    // });
});

module.exports = router;
