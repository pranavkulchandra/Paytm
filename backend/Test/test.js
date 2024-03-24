const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../index");
const mongoose = require("mongoose")
const { response } = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server")
const { User } = require("../db/db")
//Assertion Style
chai.should()
chai.use(chaiHttp);

let mongoServer;

describe("Test Bulk API", ()=> { 
    let token;

    before(async function () { 
        //Monggoos setup 
        //Create Servers
        this.timeout(5000);
        mongoServer =  await MongoMemoryServer.create();
        isConnected = true

        //Seed Daata 
        await User.insertMany([{
            firstname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password"
        }, { 
            firstname: "Jani",
                lastname: "Doe",
                username: "JaniD",
                password: "password"
        }, { 
            firstname: "Janardhan",
                lastname: "Doe",
                username: "Janardhan",
                password: "password"
        }])


        //login 
        const res = await chai.request(app)
            .post("/api/v1/user/login")
            .send({username : "pranavaccounts3@gmail.com", password : "password"});
        token = res.body.token;
        

    });

    after(async function () { 
        if (mongoServer) { 
            // Delete data 
            await User.deleteMany({
                username : {$in : ["johndoe", "JaniD", "Janardhan"]}
            }); 
            //stop server 
            await mongoServer.stop();
            isConnected = false
        }
        //diconnect server 

        await mongoose.disconnect();
    })

  


    it("it should get all user details except password", (done) => { 
        chai.request(app)
            .get("/api/v1/user/bulk?filter=Jo")
            .set("Authorization", `Bearer ${token}`)
            .end( (err, response) => { 
                response.should.have.status(200);   
            done();    

            })
    })
})
