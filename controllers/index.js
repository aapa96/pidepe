var Mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var CountryModel = require('../model/country');
var AreaGroupModel = require('../model/areaGroup');
var AreaModel = require('../model/area');
var RoleModel = require('../model/role');
var UserModel = require('../model/user');
var UserStaffModel = require('../model/userStaff');
var UserPersonModel = require('../model/userPerson');
var UserCredentialsModel = require('../model/userCredentials');

/* 
    if (err) {
        res.status(500).send({ status: 500, message: '500 Server Error', error: err });
    } else {
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send({ status: 400, message: '404 Not Found' })
        }
    } 
*/


/* Country model */
function countryRegister(req,res){
    var country = new CountryModel(req.body);
    country.save((err, response) => {
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {

                res.status(200).send(response);
            } else {
                res.status(404).send({ status: 404, message: '404 Not Found' })
            }
        }
    })
}


function getCountries(req,res){
    CountryModel.find((err,response)=>{
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send({ status: 400, message: '404 Not Found' })
            }
        } 
    })
}


/* Area group model  */
function areaGroupRegister(req,res){
    var areaGroup = new AreaGroupModel(req.body);
    areaGroup.save((err, response) => {
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {

                res.status(200).send(response);
            } else {
                res.status(404).send({ status: 404, message: '404 Not Found' })
            }
        }
    })
}
function getAreaGroupByCountryId(req, res) {
    var countryId = req.params.countryId;
    AreaGroupModel.aggregate([{
            '$match': {
                countryId: Mongoose.Types.ObjectId(countryId)
            }
        },
        {
            $lookup: {
                from: 'countries',
                localField: 'countryId',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            $unwind: {
                path: '$country',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'areagroups',
                localField: 'parentAreaGroup',
                foreignField: '_id',
                as: 'parentAreaGroup'
            }
        },
        {
            $unwind: {
                path: '$parentAreaGroup',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'areas',
                localField: '_id',
                foreignField: 'areaGroupId',
                as: 'areas'
            }
        },
        {
            '$sort': {
                _id: 1
            }
        }
    ]).then((response) => {
        res.status(200).send(response);
    }).catch((message) => {
        res.status(404).send({ status: 400, message: '404 Not Found' })
    })
}


/* Area model */
function areaRegister(req,res){
    var area = new AreaModel(req.body);
    area.save((err, response) => {
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {

                res.status(200).send(response);
            } else {
                res.status(404).send({ status: 404, message: '404 Not Found' })
            }
        }
    })
}


/* Role model */

function roleRegister(req,res){
    var role = new RoleModel(req.body);
    role.save((err, response) => {
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send({ status: 400, message: '404 Not Found' })
            }
        } 
    })
}



/* User model */
function userRegister(req,res){
    const bcryp_salts = 10;
    var user = new UserModel();
    var body = req.body;
    user.save((err, response) => {
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {
                bcrypt.hash(body.password, bcryp_salts, function(err, hash) {
                    let dataCredential = {email:body.email,password:hash,userId:response._id};
                    let dataRole = {userId:response._id,roleId:body.roleId};
                    var userCredential = new UserCredentialsModel(dataCredential);
                    var userStaff = new UserStaffModel(dataRole);
                    userStaff.save((err,response)=>{
                        if (err) {
                            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
                        } else {
                            if (response) {
                                userCredential.save((err,response)=>{
                                    if (err) {
                                        res.status(500).send({ status: 500, message: '500 Server Error', error: err });
                                    } else {
                                        if (response) {
                                            res.status(200).send(response);
                                        } else {
                                            res.status(404).send({ status: 400, message: '404 Not Found' })
                                        }
                                    } 
                                })
                            } else {
                                res.status(404).send({ status: 400, message: '404 Not Found' })
                            }
                        } 
                    })
                   
                }) 
            } else {
                res.status(404).send({ status: 400, message: '404 Not Found' })
            }
        } 
    })
}


function updateUserRegister(req,res){
    var userId = req.params.userId;
    var userPerson = new UserPersonModel(req.body);
    userPerson.save((err,response)=>{
        if (err) {
            res.status(500).send({ status: 500, message: '500 Server Error', error: err });
        } else {
            if (response) {
                UserModel.findByIdAndUpdate(userId,{userPersonId:response._id}, (err,response)=>{
                    if (err) {
                        res.status(500).send({ status: 500, message: '500 Server Error', error: err });
                    } else {
                        if (response) {
                            
                        } else {
                            res.status(404).send({ status: 400, message: '404 Not Found' })
                        }
                    } 
                })
            } else {
                res.status(404).send({ status: 400, message: '404 Not Found' })
            }
        } 
    })
    
}

module.exports = {
    areaGroupRegister,
    getAreaGroupByCountryId,

    areaRegister,

    countryRegister,
    getCountries,

    roleRegister,

    userRegister,
    updateUserRegister
}