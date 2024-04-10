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
            .send({username : "Jashma9@gmail.com", password : "password"});
        token = res.body.token;
        
        

    });

  


    it("it should get all user details except password", (done) => { 
        chai.request(app)
            .get("/api/v1/user/bulk?filter=Jo")
            .set("Authorization", `Bearer ${token}`)
            .end( (err, response) => { 
                response.should.have.status(200);   
                response.body.should.be.a("object");
                response.body.should.have.property("user").that.is.an("array")
                response.body.user.forEach(user => { 
                    user.should.have.property("firstname")
                    user.should.have.property("lastname")
                    user.should.have.property("username")
                    user.should.have.property("_id")
                })  

            done();    

            })
    })

    it("should return a 407 if no filter is provided", async ()=> { 
        const resp = await chai.request(app)
            .get("/api/v1/user/bulk?filter=" )
            .set("Authorization", `Bearer ${token}`)
            .end((err, resp) => { 
                resp.should.have.status(407)
            })
    })

    it("it should update all the users firstname / lastname in body ", (done) => { 
        chai.request(app)
            .put("/api/v1/user/update/details")
            .set("Authorization", `Bearer ${token}`)
            .send({firstname : "PranavNew"})
            .end((err, resp) => { 

                resp.should.have.status(200)
                resp.body.should.be.a("object");
                resp.body.should.have.property("firstname").equal("PranavNew")

            })
        done();
    })

    it("")
    
  after(async function () { 
            if(mongoServer) { 

            await User.deleteMany({ 
                username : { $in: ["johndoe", "JaniD", "Janardhan" ]}
            })

            await mongoServer.stop();
            isConnected = false;
            }

            await mongoose.disconnect();

        })

  


})


