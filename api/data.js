const express = require('express');
const router = express.Router();
const request = require('request')
const data = {
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
router.get('/', (req, res) => {
    console.log("!!!!")
    request({
        url: 'https://jsonplaceholder.typicode.com/posts/42',
        method: 'GET'
    }, function(error, response, body) {
        if (error) {
            console.log("!!!", error)
            res.send({ result: "error" });
        } else {
            console.log("!!!", response.statusCode, body)
            res.send({ result: "data" });
        }
    })
})

module.exports = router;