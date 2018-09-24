const express =  require('express');
const router =  express.Router();
const config = require('../config/database');
const Contact = require('../models/contactInfo');

//retriving data
router.get('/contacts', (req, res, next)=> {

    Contact.getContacts( (err,contact) => {
        if(err){
            res.json({success: false, msg: 'Failed to get contacts' });
        }
        else {
            res.json(contact);
        }
    });
    
});
//add contact
router.post('/contact', (req, res, next)=> {
    //logic to add contact
    let newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        user: req.body.user
    });  
    
    Contact.addContact(newContact, (err,contact) => {
        
        if(err){
            res.json({success: false, msg: 'Failed to add contact' });
        }
        else {
            res.json({success: true, msg: 'Contact Added Successfully' });
        }

    });
});

module.exports =  router;
