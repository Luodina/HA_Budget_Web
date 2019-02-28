const config = require("../config");
console.log(config)
const express = require('express');
const router = express.Router();
const request = require('request');
var fetch = require('node-fetch');
const corpTotalsUrl = config.API_PREFIX + "clusterFormCorpTotals";
const clusterTotalsUrl = config.API_PREFIX + "clusterFormClusterTotals";
const recBgtInputsUrl = config.API_PREFIX + "reccurentBudgetInputs";

router.get('/', (req, res) => {
    Promise.all([
        fetch(corpTotalsUrl).then(function(response) { return response.json() }),
        fetch(clusterTotalsUrl).then(function(response) { return response.json() }),
        fetch(recBgtInputsUrl).then(function(response) { return response.json() })
    ]).then(allResponses => {
        let corpTotals = allResponses[0];
        let total = corpTotals.filter(item => {
            return item["budgettype"] === "Total Revised";
        });
        console.log("total======>", total);
        let clusterTotals = allResponses[1];
        let recBgtInputs = allResponses[2];
        res.send({ result: allResponses, total: total });
    });
})

router.post('/', (req, res) => {
    let item = {
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
    fetch(recBgtInputsUrl, { method: 'POST', body: item })
        .then(res => res.json()) // expecting a json response
        .then(json => {
            console.log(json);
            res.send({ result: json });
        });
})
module.exports = router;