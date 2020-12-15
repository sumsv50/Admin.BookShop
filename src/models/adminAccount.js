const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminAccount = new Schema({
    username: String,
    password: String,
    email: String,
    avt_img: String,
    phone: String,
    status: { type: String, default: 'ACTIVE' },

});


// Model name => collection
module.exports = mongoose.model('AdminAccount', AdminAccount, 'admin_accounts');