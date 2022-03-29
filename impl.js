const e = require("express");
const { pushData } = require("./util.js");

let data = [];
let indexData = [];
let index = 0;
let payerDetails = {};

function addTransaction(req, res, next) {
    let body = req.body;

    // #TODO - remove debug - unnecessary endpoint functionality.
    if (body.hasOwnProperty('debug') && body['debug'] == true) {
        let result = {
            total: 0,
            successCount: 0,
            items: [],
        };

        for (let i of body['items']) {
            let ans = verifyAndPushTransaction(i);

            if(ans['code'] == 200){
                result['successCount'] += 1
            }
            result['total'] += 1,
            result['items'].push(ans)
        }

        result['indexedData'] = indexData
        res.status(200).send(result);
        return;
    }
    let response = verifyAndPushTransaction(body)

    response['code'] === 400 ?res.status(400).send(response): res.status(200).send(response)
}

function verifyAndPushTransaction(body) {

    // Send 400 status if any of the property is not present in the form.
    if (
        !body.hasOwnProperty("payer") ||
        !body.hasOwnProperty("timestamp") ||
        !body.hasOwnProperty("points")
    )   
        
        return ({
            code: 400,
            msg: "err: one or more property missing (payer, timestamp, points)",
            item: body
        })
    else {
        // Push form to index data
        indexData = pushData(indexData, body);

        // To keep track of actual data entries.
        data.push(body);

        // Update payer points
        updatePayerPoints(body);

        return ({
            code: 200,
            msg: "success",
            item: body,
            indexData: indexData
        })
    }
}


function spendPoints(req, res) {
    let points = req.body["points"];

    let spendDetails = {};
    let index = 0;
    while (points > 0 && indexData.length > 0) {
        let payer = indexData[0];
        // Points to spend - Check if the current payer has less points than required points.
        let pointsToSpend = (points > payer["points"])? payer["points"]: points;
        
        // Check if points spent from existing payer.
        if (spendDetails.hasOwnProperty(payer["payer"])) {
            spendDetails[payer["payer"]] -= pointsToSpend;
        } else {
            spendDetails[payer["payer"]] = -pointsToSpend;
        }

        /* Update points in payerDetails datastore */
        payerDetails[payer["payer"]] -= pointsToSpend;

        // For debugging - can be commented.
        // spendDetails['items'].push([payer['payer'], payer['points'],pointsToSpend])

        // Delete payers with 0 points. Commenting to keep track of payers and for future payer use.
        // if(payerDetails[payer['payer']] === 0)
        //     delete payerDetails[payer['payer']];

        // Update points in Indexed Data store.
        indexData[index]["points"] -= pointsToSpend;

        // check to increase the index as current payer is exhausted.
        if (indexData[index]['points'] === 0) {
            indexData.shift();
        }
        points -= pointsToSpend;
    }

    // Send with msg if some points cannot be spent due to unavailable balance.
    if (points !== 0) {
        spendDetails["Spend Fail"] = points 
    }
    // spendDetails['index'] = indexData
    res.send(spendDetails);
}

function getPayerDetails(req, res) {
    res.send(payerDetails);
}

module.exports = {
    addTransaction,
    spendPoints,
    getPayerDetails,
};

function updatePayerPoints(transaction) {
    if (payerDetails.hasOwnProperty(transaction["payer"])) {
        payerDetails[transaction["payer"]] += transaction["points"];
    } else {
        payerDetails[transaction["payer"]] = transaction["points"];
    }
}
