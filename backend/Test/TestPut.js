const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../index")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const { User } = require("../db/db")


//Assertion Style 
chai.should()
chai.use(chaiHttp)


let mongooseServer; 

describe("Test Update Details Put API", async function () { 
let token; 

    before( async function () { 
        this.timeout(5000);
        mongooseServer = await MongoMemoryServer.create(); 
        isConnected = true


        //Seed Data 
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
    })

        //login 

        const res = await chai.request(app)
            .post("/api/v1/user/login")
            .send({username : "pranavaccounts3@gmail.com", password : "password"})
        token = res.body.token


        it("it should update all the users firstname / lastname in body ", (done) => { 
            chai.request(app)
                .get("/api/v1/user/update/details")
                .set("Authorization", `Bearer ${token}`)
                .send({firstname : "PranavNew"})
                .end((err, resp) => { 
                    resp.should.have.status(200)
                    resp.body.should.be.a("object")
                    resp.should.have.property("Message").equal("User details updated Sucessfully")
                    resp.should.have.property("firstname").equal("PranavNew")
                })
        }) 
})