const authController=require('../controllers/authController');
const startupController=require('../controllers/startupController');
const queryController=require('../controllers/queryController');
const express=require('express');
const Router=express.Router();
Router.route('/signup').post(authController.signUp);
Router.route('/login').post(authController.login);
Router.route('/createStartUp').post(authController.ristrictTo("startupInit"),startupController.createStartUp)
Router.route('/updateStartUpLocation').post(authController.ristrictTo("startupInit"),startupController.updateStartUpLoc)
Router.route('/selectStartup').patch(startupController.updateStartup);
Router.route('/createQuery').post(queryController.createQuery);
Router.route('/makeAgreement').post(startupController.makeAgreement);
Router.route('/acceptAgreement').patch(startupController.acceptAgreemet);
Router.route('/logout').post(authController.logout);
module.exports=Router;