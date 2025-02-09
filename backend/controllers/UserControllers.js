const { ObjectId } = require("mongodb");
const Bus = require("../models/BusModel");
const User = require("../models/UserModel");
const History = require("../models/HistoryModel");
const nodemailer = require('nodemailer');

const getAllBus = async (req, res) => {
    try {
        const currentDateTime = new Date();
        const buses = await Bus.find().sort({ date: 1, startTime: 1 });

        const filteredBuses = buses.filter(bus => {
            const busDateTime = new Date(bus.date);
            busDateTime.setHours(bus.startTime, 0, 0, 0);

            return busDateTime >= currentDateTime;
        });

        res.json({ array: filteredBuses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error fetching bus details" });
    }
};

const getSearchBus = async (req,res)=>{
    try {
        const currentDateTime = new Date();
        const buses = await Bus.find().sort({ date: 1, startTime: 1 });

        const filteredBuses = buses.filter(bus => {
            const busDateTime = new Date(bus.date);
            busDateTime.setHours(bus.startTime, 0, 0, 0);

            return busDateTime >= currentDateTime && 
                   bus.start.toLowerCase().startsWith(req.body.from.toLowerCase()) && 
                   bus.end.toLowerCase().startsWith(req.body.to.toLowerCase());
        });

        res.json({ array: filteredBuses });
    } catch (err) {
        console.log(err);
        const buses = await Bus.find().sort({ date: 1, startTime: 1 });
        res.status(500).json({ err: "Error fetching searching details", array: buses });
    }
}

const getHistory = async (req, res) => {
    const username = req.params.username;
    try {
        const response = await History.find({ username }).sort({ createdAt: -1 });
        res.json({ response });
    } catch (err) {
        res.json({ err: 'Error in Getting History' });
    }
};

const getSingleBus = async (req, res) => {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const busDetails = await Bus.findById(id);
            if (busDetails) {
                res.json(busDetails);
            } else {
                res.status(404).json({ error: 'Bus not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.json({ err: 'Not a valid ID' });
    }
};

const getAvailableSeats = async (req, res) => {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        try {
            const data = await Bus.findById(id);
            if (data) res.json(data);
        } catch (err) {
            res.json({ err: 'Error' });
        }
    } else {
        res.json({ err: 'Not a valid ID' });
    }
};

const booking = async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        try {
            const bus = await Bus.findById(req.params.id);
            const oldList = bus.availableSeats;
            const newList = req.body.list.map((seat, index) => seat ? 1 : oldList[index]);

            bus.availableSeats = newList;
            await bus.save();

            const newHistory = new History({
                username: req.params.user,
                busId: req.params.id,
                bus,
                choosenSeats: req.body.list,
                cancelled: false,
                count: req.body.countSelectedSeats,
                total: req.body.total,
                createdAt: new Date()
            });

            await newHistory.save();
            
            const trueIndices = req.body.list.map((seat, index) => seat ? index : null).filter(index => index !== null);
            const user = await User.findOne({ username: req.params.user });
            let email = user.email;

            const html = `
                <h1>Booking Details</h1>
                <p><strong>Booked for:</strong> ${bus.date}</p>
                <p><strong>Username:</strong> ${req.params.user}</p>
                <p><strong>Booking ID:</strong> ${newHistory._id}</p>
                <h3><strong>Bus Details:</strong></h3>
                <p><strong>Bus Name:</strong>${bus.busName}</p>
                <p><strong>From:</strong>${bus.start}</p>
                <p><strong>To:</strong>${bus.end}</p>
                <p><strong>Starting Time:</strong>${bus.startTime}</p>
                <p><strong>Chosen Seats:</strong> ${JSON.stringify(trueIndices)}</p>
                <p><strong>Number of Tickets:</strong> ${JSON.stringify(req.body.countSelectedSeats)}</p>
                <p><strong>Total:</strong> ${JSON.stringify(req.body.total)}</p>
                <p><strong>Booked At:</strong> ${new Date()}</p>`;
                
            const sub = 'Ticket Confirmation';
            sendMail(html, email, sub);
            res.json({ msg: 'Booking Confirmed' });

        } catch (err) {
            console.log(err)
            res.json({ err: 'Error' });
        }
    }
};

const cancelTicket = async (req, res) => {
    const createdAt = new Date(req.body.createdAt);
    const currentTime = new Date();
    const startDate = new Date(req.body.bus.date);
    const timeDifferenceInHours = (currentTime - createdAt) / (1000 * 60 * 60);
    const check = (startDate - currentTime) / (1000 * 60 * 60);

    if (check < 1) {
        res.json({ err: 'You Cannot Cancel Ticket Anymore' });
    } else {
        let penalty;
        if (timeDifferenceInHours < 24) 
            penalty = ((5 / 100) * req.body.bus.ticketPrice) * req.body.count;
        else
            penalty = ((40 / 100) * req.body.bus.ticketPrice) * req.body.count;

        penalty = parseFloat(penalty.toFixed(2));

        try {
            const bus = await Bus.findById(req.body.busId);

            if (bus) {
                const list = bus.availableSeats.map((seat, index) => {
                    return req.body.choosenSeats[index] ? 0 : seat;
                });

                await Bus.updateOne(
                    { _id: new ObjectId(req.body.busId) },
                    { $set: { availableSeats: list } }
                );

                await History.updateOne(
                    { _id: new ObjectId(req.body._id) },
                    { $set: { cancelled: true } }
                );

                const user = await User.findOne({username : req.body.username});
                const html = `
                    <h1 style="color: red;">Cancelled Ticket</h1>
                    <p><strong>Booked for:</strong> ${bus.date}</p>
                    <p><strong>Username:</strong>${user.username}</p>
                    <h3><strong>Bus Details:</strong></h3>
                    <p><strong>Bus Name:</strong>${bus.busName}</p>
                    <p><strong>From:</strong>${bus.start}</p>
                    <p><strong>To:</strong>${bus.end}</p>
                    <p><strong>Starting Time:</strong>${bus.startTime}</p>
                    <p><strong>Cancelled At:</strong> ${new Date()}</p>`;

                const sub = 'Ticket Cancellation';
                sendMail(html, user.email, sub);
                res.json({ msg: "success", penalty });
            }
        } catch (err) {
            res.json({ err: 'Error' });
        }
    }
};

function sendMail(html, email, sub) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bustop.ticket@gmail.com',
            pass: 'mndw uine qxzj sohu'
        }
    });

    var mailOptions = {
        from: 'bustop.ticket@gmail.com',
        to: email,
        subject: sub,
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
    getSearchBus,
    getSingleBus,
    getAvailableSeats,
    booking,
    getHistory,
    cancelTicket
};

