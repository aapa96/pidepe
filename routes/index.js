var hardController = require('../controllers/index');
var express = require('express');
var api = express.Router();


/* Area group model */
api.post('/area-group',hardController.areaGroupRegister)
api.get('/area-group/:countryId',hardController.getAreaGroupByCountryId)

/* Area model */
api.post('/area',hardController.areaRegister)

/* Country model */
api.post('/country',hardController.countryRegister)
api.get('/country',hardController.getCountries)

/* Role model */
api.post('/role',hardController.roleRegister)

/* User model */
api.post('/user',hardController.userRegister)
api.post('/user-update-register/:userId',hardController.updateUserRegister)

module.exports = api;