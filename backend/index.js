const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db')
const bodyParser = require('body-parser');
const { register, login } = require('./controllers/AuthControllers');
const { getAllBus, getSingleBus, getAvailableSeats, cancelTicket, updateSeats, booking, getHistory } = require('./controllers/UserControllers');
const { getAllHistory, deleteHistory, deleteAllHistory, addBus, updateBus, deleteBus, getAllUsers, deleteUser, allBus } = require('./controllers/AdminControllers');
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
app.get('/gethistory/:username', getHistory);
app.get('/:id', getSingleBus);
app.get('/availableseats/:id', getAvailableSeats)
app.post('/:id/:user/confirmticket', booking)
app.put('/:id/updateseats', updateSeats)
app.post('/cancel', cancelTicket)


app.get('/admin/allbus', allBus)
app.get('/admin/gethistory', getAllHistory)
app.get('/admin/getusers', getAllUsers)
app.delete('/admin/deleteuser/:id', deleteUser)
app.delete('/admin/deleteHistory/:id', deleteHistory)
app.delete('/admin/deleteall', deleteAllHistory)
app.post('/admin/add', addBus)
app.put('/admin/update/:id', updateBus)
app.delete('/admin/delete/:id', deleteBus)