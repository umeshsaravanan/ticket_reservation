const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
var nodemailer = require('nodemailer');

const getAllBus = async (req, res) => {
    const db = getDb();
    try {
        const buses = await db.collection('busDetails').find().toArray();
        res.json({ array: buses });
    } catch (err) {
        res.status(500).json({ err: "Error fetching bus details" });
    }
}

const getSingleBus = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const busDetails = await db.collection('busDetails').findOne({ _id: new ObjectId(id) });
            if (busDetails) {
                res.json(busDetails);
            } else {
                res.status(404).json({ error: 'Bus not found' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        res.json({ err: 'Not a valid ID' })
    }
}

const getAvailableSeats = async (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const data = await db.collection('busDetails').findOne({ _id: new ObjectId(id) });
            if (data)
                res.json(data)
        } catch (err) {
            res.json({ err });
        }
    }
    else {
        res.json({ msg: 'not a valid ID' })
    }
}

const cancelTicket = async (req, res) => {
    const db = getDb();
    const createdAt = new Date(req.body.createdAt);
    const currentTime = new Date();
    const startDate = new Date(req.body.bus.date);
    const timeDifferenceInHours = (currentTime - createdAt) / (1000 * 60 * 60);
    const check = (startDate - currentTime) / (1000 * 60 * 60)

    if (check < 1) {
        res.json({ err: 'You Cannot Cancel Ticket Anymore' })
    }
    else {
        let penalty;
        if (timeDifferenceInHours < 24) 
            penalty = ((5 / 100) * req.body.bus.ticketPrice) * req.body.count;
        else
            penalty = ((40 / 100) * req.body.bus.ticketPrice) * req.body.count;

        penalty = parseFloat(penalty.toFixed(2));

        try {
            const bus = await db.collection('busDetails').findOne({ _id: new ObjectId(req.body.busId) })

            if (bus) {
                const list = bus.availableSeats.map((seat, index) => {
                    return req.body.choosenSeats[index] ? 0 : seat;
                });
                const response = await db.collection('busDetails').updateOne(
                    { _id: new ObjectId(req.body.busId) },
                    { $set: { availableSeats: list } }
                )
                if (response.modifiedCount === 1) {
                    res.json({ msg: "success", penalty })
                    const response = await db.collection('History').updateOne(
                        { _id: new ObjectId(req.body._id) },
                        { $set: { cancelled: true } }
                    )
                } else {
                    res.json({ err: 'Error Occured While Cancelling' })
                }
            }
        } catch (err) {
            res.json({ err })
        }
    }

}

const booking = async (req, res) => {
    const db = getDb();
    if (ObjectId.isValid(req.params.id)) {
        try {
            const bus = await db.collection('busDetails').findOne({ _id: new ObjectId(req.params.id) })

            const oldList = bus.availableSeats;
            const newList = req.body.list.map((seat, index) => seat ? 1 : oldList[index]);

            const result = await db.collection('busDetails').updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { availableSeats: newList } }
            )
            if (result.modifiedCount === 1) {
                const result = await db.collection('History').insertOne({
                    username: req.params.user,
                    busId: req.params.id,
                    bus,
                    choosenSeats: req.body.list,
                    cancelled: false,
                    count: req.body.countSelectedSeats,
                    total: req.body.total,
                    createdAt: new Date()
                })
                const trueIndices = req.body.list.map((seat, index) => seat ? index : null).filter(index => index !== null);
                const user = await db.collection('users').findOne({ username: req.params.user });
                let email;
                if (user) {
                    email = user.email
                }
                const html = `
                    <h1>Booking Details</h1>
                    <p><strong>Booked for:</strong> ${bus.date}</p>
                    <p><strong>Username:</strong> ${req.params.user}</p>
                    <p><strong>Booking ID:</strong>${result.insertedId}</p>
                    <h3><strong>Bus Details:</strong></h3>
                    <p><strong>Bus Name:</strong>${bus.busName}</p>
                    <p><strong>From:</strong>${bus.start}</p>
                    <p><strong>To:</strong>${bus.end}</p>
                    <p><strong>Starting Time:</strong>${bus.startTime}</p>
                    <p><strong>Chosen Seats:</strong> ${JSON.stringify(trueIndices)}</p>
                    <p><strong>Number of Tickets:</strong> ${JSON.stringify(req.body.countSelectedSeats)}</p>
                    <p><strong>Total:</strong> ${JSON.stringify(req.body.total)}</p>
                    <p><strong>Booked At:</strong> ${new Date()}</p>`
                
                sendMail(html, email);
                res.json({ msg: 'booking Confirmed' })
            }
            else {
                res.json({ err: 'Error occured while Booking' })
            }

        } catch (err) {
            res.json({ err })
        }

    }
}

const updateSeats =  async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    console.log('hi')
    if (ObjectId.isValid(id)) {
        try {
            const response = await db.collection('busDetails').updateOne(
                { _id: new ObjectId(id) },
                { $set: { availableSeats: req.body.list } }
            )

            console.log(response)
        } catch (err) {
            res.json({ err })
        }
    } else {
        res.json({ err: 'not a valid id' })
    }
}


function sendMail(html, email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'redbus.ticketconfirmation@gmail.com',
            pass: 'zozp ejty uyms arck'
        }
    });

    var mailOptions = {
        from: 'redbus.ticketconfirmation@gmail.com',
        to: email,
        subject: 'Ticket Confirmation',
        html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    getAllBus,
    getSingleBus,
    getAvailableSeats,
    booking,
    updateSeats,
    cancelTicket
}