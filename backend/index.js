const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectToDb, getDb } = require('./db')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
var nodemailer = require('nodemailer');
require('dotenv').config()
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

let db;
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Listening to port number ${PORT} :)`);
        })
        db = getDb();
    }
    else {
        console.log("Problem in connecting to Database");
    }
})


app.post('/register', async (req, res) => {

    try {
        const duplicate = await db.collection('users').findOne({ username: req.body.username });
        if (duplicate)
            res.json({ err: "Username Already Exixts :(" })
        else {
            try {
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.pwd, 10)
                };
                db.collection('users').insertOne(newUser).then(response => {
                    res.json({ msg: true });
                }).catch(err => {
                    res.json({ err });
                })
            } catch (err) {
                res.json({ err })
            }
        }
    } catch (err) {
        res.json({ err })
    }
})

app.post('/login', async (req, res) => {
    const user = await db.collection('users').findOne({ username: req.body.username });

    if (!user) {
        return res.json({ err: 'Username doesn`t exist' });
    }
    else {
        try {
            const match = await bcrypt.compare(req.body.pwd, user.password);

            if (match) {
                return res.json({ msg: true, role: user.role, email: user.email });
            } else {
                return res.json({ err: 'Username / password doesn`t match' });
            }
        } catch (error) {
            return res.json({ err: error });
        }
    }

});

app.get('/', async (req, res) => {
    try {
        const buses = await db.collection('busDetails').find().toArray();
        res.json({ array: buses });
    } catch (err) {
        res.status(500).json({ err: "Error fetching bus details" });
    }
});

app.get('/:id', async (req, res) => {
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

});


app.get('/availableseats/:id', async (req, res) => {
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

})

app.get('/admin/gethistory', async (req, res) => {
    try {
        const response = await db.collection('History').find().sort({ createdAt: -1 }).toArray();
        res.json({ response })
    } catch (err) {
        res.json({ err: 'Error in Getting History' })
    }
})

app.post('/cancel', async (req, res) => {
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

})

app.delete('/admin/deleteHistory/:id', async (req, res) => {
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
})

app.delete('/admin/deleteall', async (req, res) => {
    try {
        const response = await db.collection('History').deleteMany({});

        if (response.deletedCount)
            res.json({ msg: 'success' })
        else
            res.json({ err: 'Error in Deleteing History' })
    } catch (err) {
        res.json({ err })
    }
})

app.post('/admin/add', async (req, res) => {
    try {
        const response = await db.collection('busDetails').insertOne(req.body);

        if (response.insertedId)
            res.json({ msg: 'inserted Successfully' })

    } catch (err) {
        console.log(err)
    }
})

app.put('/admin/update/:id', async (req, res) => {
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

})

app.post('/:id/:user/confirmticket', async (req, res) => {

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
})

app.put('/:id/updateseats', async (req, res) => {
    const id = req.params.id;

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
})

app.delete('/admin/delete/:id', async (req, res) => {
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
})

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