const request = require('supertest');
const app = require('../routes/server');
const { MongoClient } = require("mongodb");
const { connectToDatabase } = require('../routes/database/mongodb');
const ObjectId = require("mongodb").ObjectID;

//TEST DATA
const ID_ONE = "5f301802d422e6c9345d4062";
const ID_TWO = "3c301802d422e7c9344d406b";
let currentDateTime = new Date();
currentDateTime.setSeconds(0);
currentDateTime.setMilliseconds(0);

beforeEach(async done => {
  let collection = await connectToDatabase(true);
  collection.deleteMany({});
  done();
})

afterAll(async done => {
  let collection = await connectToDatabase(true);
  collection.deleteMany({});
  done();
})

describe('Post Endpoint', () => {
  it('should create a new project', async () => {
    const res = await request(app)
    .post('/project')
    .send({
      name: 'Test POST',
      description: 'Test POST Description'
    })
   expect(res.statusCode).toEqual(200)
  })
})

describe('Get Endpoint', async () => {
  it('should get the project with the corresponding object id', async () => {

    let collection = await connectToDatabase(true);
     
    let testData = {
      _id: ObjectId(ID_ONE),
      name: 'Test GET',
      description: 'Test GET Description',
      modifiedDateTime: null,
      createdDateTime: currentDateTime.toISOString()
    }

    collection.insert(testData, (error, result) => {
      if(error) throw new Error(`Unable to set test data in database: ${error}`);
    })
      
    let expected = {
      _id: ID_ONE,
      name: 'Test GET',
      description: 'Test GET Description',
      modifiedDateTime: null,
      createdDateTime:currentDateTime.toISOString()
    }

    const res = await request(app)
    .get(`/project/${ID_ONE}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expected)
  })
})

describe('Get All Endpoint', () => {
  it('should return all projects', async () => {

    let collection = await connectToDatabase(true);
     
    let testDataOne = {
      _id: ObjectId(ID_ONE),
      name: 'Test GET all 1',
      description: 'Test GET all Description 1',
      modifiedDateTime: null,
      createdDateTime: currentDateTime.toISOString()
    }
    
    let testDataTwo = {
      _id: ObjectId(ID_TWO),
      name: 'Test GET all 2',
      description: 'Test GET Description 2',
      modifiedDateTime: null,
      createdDateTime: currentDateTime.toISOString()
    }

    collection.insertMany([testDataOne, testDataTwo], (error, result) => {
      if(error) throw new Error(`Unable to set test data in database: ${error}`);
    })

    testDataOne._id = ID_ONE
    testDataTwo._id = ID_TWO

    const res = await request(app)
    .get('/projects')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([testDataOne, testDataTwo])
  })
})

describe('Put Endpoint', async () => {
  it('should edit the project with the corresponding object id', async () => {

    let collection = await connectToDatabase(true);
     
    let testData = {
      _id: ObjectId(ID_ONE),
      name: 'Test PUT',
      description: 'Test PUT Description',
      modifiedDateTime: null,
      createdDateTime: currentDateTime.toISOString()
    }

    collection.insert(testData, (error, result) => {
      if(error) throw new Error(`Unable to set test data in database: ${error}`);
    })
      
    let editTestData = {
      _id: ID_ONE,
      name: 'Test PUT Edit',
      description: 'Test PUT Description Edit',
      modifiedDateTime: currentDateTime.toISOString(),
      createdDateTime:currentDateTime.toISOString()
    }

    const res = await request(app)
    .put(`/project/${ID_ONE}`)
    .send(editTestData)
    expect(res.statusCode).toEqual(200)

    editTestData._id = ObjectId(ID_ONE)
    collection.findOne(editTestData._id, (error, result) => {
      if(error){
        throw new Error(`Unable to get validate project with id "${editTestData._idv}" is updated in database.`)
      }
      expect(result).toEqual(editTestData)
    })
  })
})

describe('Delete Endpoint', async () => {
  it('should delete the project with the corresponding object id', async () => {

    let collection = await connectToDatabase(true);
     
    let testData = {
      _id: ObjectId(ID_ONE),
      name: 'Test GET',
      description: 'Test GET Description',
      modifiedDateTime: null,
      createdDateTime: currentDateTime.toISOString()
    }

    collection.insert(testData, (error, result) => {
      if(error) throw new Error(`Unable to set test data in database: ${error}`);
    })

    const res = await request(app)
    .delete(`/project/${ID_ONE}`)
    expect(res.statusCode).toEqual(200)
  })
})