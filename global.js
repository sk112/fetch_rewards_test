const e = require("express");
const { pushData } = require("./util.js");

let data = [];
let indexData = [];
let index = 0;
let payerDetails = {};

function addTransaction(req, res, next) {
    let body = req.body;
    
    
    // Send 400 status if any of the property is not present in the form.
    if (
        !body.hasOwnProperty("payer") ||
        !body.hasOwnProperty("timestamp") ||
        !body.hasOwnProperty("points")
    )
        res
            .status(400)
            .send({
                msg: "err: one or more property missing (payer, timestamp, points)",
            });
    else {
        
        // Push form to index data
        indexData = pushData(indexData, body);

        // To keep track of actual data entries.
        data.push(body);

        // Update payer points
        updatePayerPoints(body);

        res
            .status(200)
            .send({ msg: "success", indexed: indexData, payerDetails: payerDetails });
    }
}

function spendPoints(req, res) {
    let points = req.body["points"];

    let spendDetails = {};
    while (points > 0 && index < indexData.length) {
        let payer = indexData[index];

        // Points to spend - Check if the current payer has less points than required points.
        let pointsToSpend = points > payer["points"] ? payer["points"] : points;

        // Check if points spent from previous payer
        if (spendDetails.hasOwnProperty(payer["payer"])) {
            spendDetails[payer["payer"]] -= pointsToSpend;
        } else {
            spendDetails[payer["payer"]] = -pointsToSpend;
        }

        /* Update points in payerDetails datastore */
        payerDetails[payer["payer"]] -= pointsToSpend;
        /*
        // Delete payers with 0 points. Commenting to keep track of payers and for future payer use.
        if(payerDetails[payer['payer']] === 0)
            delete payerDetails[payer['payer']];
        */

        // Update points in Indexed Data store.
        indexData[index]["points"] -= pointsToSpend;

        // If points are greater than current payer points, increase the index as current payer is exhausted.
        if (points >= payer["points"]) {
            index++;
        }
        points -= pointsToSpend;
    }

    // Send with msg if some points cannot be spent due to unavailable balance.
    if (points !== 0) {
        spendDetails["msg"] =
            points +
            " cannot be spent. this may be because of insufficient point balance. Refer to your payer details for more information";
    }
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
