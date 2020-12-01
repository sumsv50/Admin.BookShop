const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/sbookshop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect successful!');
    } catch (error) {
        console.log('Connect fail!');
    }
}
module.exports = { connect };