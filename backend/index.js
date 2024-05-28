const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db')
const bodyParser = require('body-parser');
const { register, login } = require('./controllers/AuthControllers');
const { getAllBus, getSingleBus, getAvailableSeats, cancelTicket, updateSeats, booking } = require('./controllers/UserControllers');
const { getHistory, deleteHistory, deleteAllHistory, addBus, updateBus, deleteBus } = require('./controllers/AdminControllers');
require('dotenv').config()
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Listening to port number ${PORT} :)`);
        })
    }
    else {
        console.log("Problem in connecting to Database");
    }
})

app.post('/register', register)
app.post('/login', login);


app.get('/', getAllBus);
app.get('/:id', getSingleBus);
app.get('/availableseats/:id', getAvailableSeats)
app.post('/:id/:user/confirmticket', booking)
app.put('/:id/updateseats', updateSeats)
app.post('/cancel', cancelTicket)


app.get('/admin/gethistory', getHistory)
app.delete('/admin/deleteHistory/:id', deleteHistory)
app.delete('/admin/deleteall', deleteAllHistory)
app.post('/admin/add', addBus)
app.put('/admin/update/:id', updateBus)
app.delete('/admin/delete/:id', deleteBus)