const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getHistory = async (req, res) => {
    const db = getDb();
    try {
        const response = await db.collection('History').find().sort({ createdAt: -1 }).toArray();
        res.json({ response })
    } catch (err) {
        res.json({ err: 'Error in Getting History' })
    }
}

const deleteHistory = async (req, res) => {
    const db = getDb();

    if (ObjectId.isValid(req.params.id)) {
        try {
            const response = await db.collection('History').deleteOne(
                { _id: new ObjectId(req.params.id) })
            console.log(response)
            if (response.deletedCount === 1)
                res.json({ msg: 'success' })
            else
                res.json({ err: 'error' })
        } catch (err) {
            res.json({ err })
        }
    }
    else {
        res.json({ err: 'invalid id' })
    }
}

const deleteAllHistory = async (req, res) => {
    const db = getDb();
    try {
        const response = await db.collection('History').deleteMany({});

        if (response.deletedCount)
            res.json({ msg: 'success' })
        else
            res.json({ err: 'Error in Deleteing History' })
    } catch (err) {
        res.json({ err })
    }
}

const addBus = async (req, res) => {
    const db = getDb();
    try {
        const response = await db.collection('busDetails').insertOne(req.body);

        if (response.insertedId)
            res.json({ msg: 'inserted Successfully' })

    } catch (err) {
        console.log(err)
    }
}

const updateBus = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const response = await db.collection('busDetails').updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body }
            )
            console.log(response)
            if (response.modifiedCount === 1)
                res.json({ msg: "success" })
            else
                res.json({ err: "not a valid id" })
        } catch (err) {
            console.log(err)
            res.json({ err })
        }
    }
    else {
        res.json({ msg: 'not a valid ID' })
    }
}

const deleteBus = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const response = await db.collection('busDetails').deleteOne(
                { _id: new ObjectId(id) }
            )
            console.log(response)
            if (response.deletedCount === 1)
                res.json({ msg: 'success' })
            else
                res.json({ err: 'error occured' })
        } catch (err) {
            console.log(err)
        }
    }
    else {
        res.json({ err: 'not a valid ID' })
    }
}

module.exports = {
    getHistory,
    deleteHistory,
    deleteAllHistory,
    addBus,
    updateBus,
    deleteBus
}