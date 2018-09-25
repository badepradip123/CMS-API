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

//retriving data by user
router.get('/contacts/:user', (req, res, next)=> {

    Contact.getContactsUser({user: req.params.user}, (err,contact) => {
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

//delete contact
router.delete('/contact/:id', (req, res, next)=> {
    //logic to delete contact
    Contact.deleteContact({_id: req.params.id}, (err, result) => {

        if(err){
                   res.json(err);
               }
        else{
             res.json(result);
            }
    });
});

 //update contact
 router.patch('/contact/:id', (req, res, next)=> {
    //logic to update contact
    Contact.updateContact({_id: req.params.id},req.body, (err, result) => {

        if(err){
          res.json(err);
        }
        else{
            res.json(result);
        }
    });            
});

module.exports =  router;
