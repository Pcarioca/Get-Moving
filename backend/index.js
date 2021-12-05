//IMPORTS

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import QRCode from 'qrcode'
import Code from "./models/code.js";
import Jimp from "jimp"
import QrCode from "qrcode-reader";
import * as fs from 'fs';
import Provider from "./models/provider.js";

//Initializing dotenv for database connection

dotenv.config();

//Initializing the app

const app = express();

//Initializing MongoDB connection

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//Check connection

db.once("open", () =>{
    console.log("Connected to MongoDB");
})

//Adding body-parser

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

//Routers

function makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return new Promise((resv, rej) => {
   Code.findOne({id: result})
    .then(foundCode => {
        if (foundCode) {
            makeid(randomIntFromInterval(20,30));
            return;
        }
        resv(result)
        return result;
    
    })
    .catch(err => {
        rej(err)
        return;
    })})
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



app.get("/get-code", async (req, res) => {
    const id = await makeid(randomIntFromInterval(20,30))
    const {email,firstName, lastName, country, city, zipCode, address, phoneNumber, vehicle} = req.query;
    QRCode.toDataURL(id)
  .then(url => {
    const code = new Code();
    code.id = id;
    code.vehicle = vehicle;
    code.email = email;
    code.firstName = firstName;
    code.lastName = lastName;
    code.city = city;
    code.country = country;
    code.zipCode = zipCode;
    code.address = address;
    code.phoneNumber = phoneNumber;
    code.save()
        .catch(err => console.log(err))
    res.send({url: encodeURI(url) , id:id})
  })
  .catch(err => {
    console.error(err)
  })
})

app.post("/verify-code", (req, res) => {
    const base64= req.body.base64 ;
    const base64Data = base64.replace(/^data:image\/png;base64,/, ""); 
    const buff = Buffer.from(base64Data, 'base64');
    const qr = new QrCode();
    Jimp.read(buff, function(error, image){
        if(error) console.log(error);
        qr.callback = function(err, value){
            if(err) console.log(err);
            const id = value.result;
            Code.findOne({id: id})
            .then(foundCode => {
                if (foundCode) {
                    if(foundCode.used === true){
                        res.status(403).send({message: "code aleardy used"});
                        return;
                    }
                    foundCode.used = true;
                    foundCode.save();
                    res.send({
                        message: "everything worked"
                        , lastName: foundCode.lastName, firstName: foundCode.firstName, vehicle: foundCode.vehicle
                    })
                    return;
                }
                
                res.status(404).send({
                    message: "code doesn't exists"
                })
                return;
            
            })
            .catch(err => {
                res.send(err)
                return;
            })

        };
        qr.decode(image.bitmap);
    })
   
})

app.post("/provider", (req, res) => {
    const {businessName, hqLocation, service, city, email, username, password, phoneNumber} = req.body;
    // console.log(businessName, hqLocation, service, city, email, username, password, phoneNumber)
    const provider  = new Provider();
    provider.businessName = businessName;
    provider.hqLocation = hqLocation;
    provider.service = service;
    provider.city = city;
    provider.email = email;
    provider.username = username;
    provider.password = password;
    provider.phoneNumber = phoneNumber;
    provider.save()
        .then(data => {
           res.send(data)
        })
        .catch(err => {
            res.send(err)
            console.log(err)
        })
})

app.post("/login", (req,res) => {
    const {email, password} = req.body;
    Provider.findOne({email:email}, (err, account) => {
        if (err) {
            res.send(err);
            return;
        }
        if(account){
            if(password == account.password){
                res.send(account);
                return;
            }
            res.send({
                err: "wrong password"
            })
            return;
        }
        res.send({
            err: "account doesn't exist"
        })
        return;

    })
})
//Check for error

db.on("error", err => {
    console.log(err);
})
//Creating port variable from env variable or setting it mannualy

const PORT = process.env.PORT || 4000;


//Listening on the PORT variable and then console logging the port

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})