//imports 
const express = require("express");
const router = express.Router();

//importing Grocery Schema
const GroceryModel = require("../models/grocery");

//Post api Method 
router.post("/add", function (req, res) {
    console.log(req.body);
    const GroceryItem = new GroceryModel(req.body);
    GroceryItem.save(function (err) {
        if (err) {
            res.status(400).send({
                message: err,
            })
        } else {
            res.send("Grocery items added successfully");
        }
    })

});


//Get Method to List the Data in UI
router.get("/getAll", function (req, res) {
    GroceryModel.find({}, function (err, data) {
        if (err) {
            res.status(400).send({
                message: err,
            })
        } else {
            res.send({ result: data });
        }
    })
});


//Put Method to update the Grocery items
router.put("/updatePurchaseStatus", function (req, res) {
    GroceryModel.findOneAndUpdate({
        "_id": req.body._id
    }, {
        "isPurchased": true
    }, function (err) {
        if (err) {
            res.status(400).send({
                message: err,
            });
        } else {
            res.send("purchased Status Updated Successfuly");
        }
    })
});

//Delete Method to delete Items from List of items
router.delete("/deleteGroceryItem", function (req, res) {
    const groceryItemId = req.body._id;
    GroceryModel.remove({ _id: groceryItemId }, function (err) {
        if (err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
            });
        } else {
            res.send({ result: "Grocery item Deleted Successfully" });
        }
    });
});


//exporting  the router 
module.exports = router;