const { ObjectId } = require("mongodb");
const Bus = require("../models/BusModel");
const History = require("../models/HistoryModel");
const User = require("../models/UserModel");

const allBus = async (req, res) => {
    try {
        const buses = await Bus.find().sort({ date: 1, startTime: 1 });
        res.json({ array: buses });
    } catch (err) {
        res.status(500).json({ err: "Error fetching bus details" });
    }
};

const getAllHistory = async (req, res) => {
    try {
        const response = await History.find().sort({ createdAt: -1 });
        res.json({ response });
    } catch (err) {
        res.json({ err: 'Error in Getting History' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.json({ response });
    } catch (err) {
        res.json({ err: 'Error in Getting Users' });
    }
};

const deleteUser = async (req, res) =>{
    try {
        const response = await User.deleteOne({ _id : req.params.id });
        if (response.deletedCount === 1)
            res.json({ msg: 'Success' });
        else
            res.json({ err: 'Error occurred' });
    } catch(err){
        res.json({ err : 'Error' });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const response = await History.deleteOne({ _id: req.params.id });
        if (response.deletedCount === 1)
            res.json({ msg: 'Success' });
        else
            res.json({ err: 'Error occurred' });
    } catch (err) {
        res.json({ err : 'Error' });
    }
};

const deleteAllHistory = async (req, res) => {
    try {
        const response = await History.deleteMany({});
        if (response.deletedCount)
            res.json({ msg: 'Success' });
        else
            res.json({ err: 'Error in Deleting History' });
    } catch (err) {
        res.json({ err : 'Error' });
    }
};

const addBus = async (req, res) => {
    try {
        const newBus = new Bus(req.body);
        await newBus.save();
        res.json({ msg: 'Inserted Successfully' });
    } catch (err) {
        res.json({ err: 'Error' });
    }
};

const emptySeats = async (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        try {
            const response = await Bus.updateOne(
                { _id: new ObjectId(id) },
                { $set: { availableSeats: req.body.list } }
            );
            if(matchedCount === 1)
                res.json({msg : true});
            else
                res.json({msg : false})
        } catch (err) {
            res.json({ err: 'Error' });
        }
    } else {
        res.json({ err: 'Not a valid ID' });
    }
};

const updateBus = async (req, res) => {
    try {
        const response = await Bus.updateOne({ _id: req.params.id }, { $set: req.body });
        if (response.modifiedCount === 1)
            res.json({ msg: 'Success' });
        else
            res.json({ err: 'Not a valid ID' });
    } catch (err) {
        res.json({ err : 'Error' });
    }
};

const deleteBus = async (req, res) => {
    try {
        const response = await Bus.deleteOne({ _id: req.params.id });
        if (response.deletedCount === 1)
            res.json({ msg: 'Success' });
        else
            res.json({ err: 'Error occurred' });
    } catch (err) {
        res.json({ err : 'Error' });
    }
};

module.exports = {
    allBus,
    getAllHistory,
    getAllUsers,
    emptySeats,
    deleteUser,
    deleteHistory,
    deleteAllHistory,
    addBus,
    updateBus,
    deleteBus
};
