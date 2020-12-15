const AdminAccount = require("../adminAccount");
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.addAdmin = async (newAdmin) => {
    hash = await bcrypt.hash(newAdmin.password, saltRounds);
    newAdmin.password = hash;
    const adminAccount = new AdminAccount(newAdmin);
    adminAccount.save();
}

module.exports.getAdmin = (id) => {
    return AdminAccount.findOne({_id: id}).lean();
}

module.exports.checkCredential = async(username, password) => {
    try {
        const user = await AdminAccount.findOne({username}).lean();
        if(!user) {
            return false;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return false;
        }
        return user;
    } catch(err) { next(err) };
}