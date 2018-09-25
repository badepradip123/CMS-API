const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const ContactSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { collection: 'contactinfo' });

const Contacts = module.exports = mongoose.model('Contacts', ContactSchema);

// module.exports.getUserById = function(id, callback)  {
//     User.findById(id, callback);
// }

module.exports.getContacts = function(callback)  {
    Contacts.find(callback);
}

module.exports.getContactsUser = function(user,callback)  {
    Contacts.find(user,callback);
}

module.exports.addContact = function(newContact, callback)  {    
    newContact.save(callback);     
}

module.exports.deleteContact = function(id, callback)  {    
    Contacts.remove(id,callback);     
}

module.exports.updateContact = function(id, body,callback)  {    
    Contacts.findByIdAndUpdate(id,body,callback);     
}