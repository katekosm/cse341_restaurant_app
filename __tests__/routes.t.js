const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const app = require("../app");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(app);

//Users collection
describe("User collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockUser;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("GET: users/", async () => {
    const res = await request.get("/users");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("POST: users/", async () => {  
    mockUser = {
      name: "Test",
      lastName: "User",
      nickname: "test.user",
      email: "test.user@email.com",
      yearsOfWorking: 10,
      gender: 1,
      password: "Test1"
    };
    const res = (await request.post("/users").send(mockUser));
    docId = res.body.insertedId;
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });

  test("GET: users/{id}", async () => {
    const res = await request.get("/users/" + docId);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("PUT: users/{id}", async () => {  
    mockUser = {
      name: "Test",
      lastName: "User",
      nickname: "test.user",
      email: "test.user@email.com",
      yearsOfWorking: 10,
      gender: 1,
      userType: 1,
      password: "Test1"
    };
    const res = (await request.put("/users/" + docId).send(mockUser));
    expect(res.statusCode).toBe(204);
  });

  test("DELETE: users/{id}", async () => {
    const res = await request.delete("/users/" + docId);
    expect(res.statusCode).toBe(200);
  });
});

//Customers collection
describe("Customer collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockCustomer;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("GET: customers/", async () => {
    const res = await request.get("/customers");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("POST: customers/", async () => {  
    mockCustomer = {
      _id: 123451234,
      userName: "test.test",
      googleId: "123412341234",
      email: "test@test.com",
    };
    const res = (await request.post("/customers").send(mockCustomer));
    docId = res.body.upsertedId;
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  
  test("GET: customers/{id}", async () => {
    const res = await request.get("/customers/" + docId);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

 test("PUT: customers/{id}", async () => {  
    mockCustomer = {
      email: "test2@test.com",
      userName: "test2.test",
    };
    const res = (await request.put("/customers/" + docId).send(mockCustomer));
    expect(res.statusCode).toBe(204);
  });

  test("DELETE: customers/{id}", async () => {
    const res = await request.delete("/customers/" + docId);
    expect(res.statusCode).toBe(200);
  }); 
});

//Orders collection
describe("Order collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockOrder;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("GET: orders/", async () => {
    const res = await request.get("/orders");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("POST: orders/", async () => {  
    mockOrder = {
      customerId: 12345,
      orderDate: "2023/05/31",
      totalPrice: 123,
      paymentMethod: "Credit Card",
      paymentStatus: "Waiting for approval",
      shippingAddress: "Somewhere 23, Anywhere, Everywhere",
      shippingStatus: "Waiting for approval"
    };
    const res = (await request.post("/orders").send(mockOrder));
    docId = res.body.insertedId;
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });

  test("GET: orders/{id}", async () => {
    const res = await request.get("/orders/" + docId);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("PUT: orders/{id}", async () => {  
    mockOrder = {
      customerId: 12345,
      orderDate: "2023/06/01",
      totalPrice: 1234,
      paymentMethod: "Credit Card",
      paymentStatus: "Completed",
      shippingAddress: "Somewhere 23, Anywhere, Everywhere",
      shippingStatus: "Sent"
    };
    const res = (await request.put("/orders/" + docId).send(mockOrder));
    expect(res.statusCode).toBe(204);
  });

  test("DELETE: orders/{id}", async () => {
    const res = await request.delete("/orders/" + docId);
    expect(res.statusCode).toBe(200);
  });
});

//Menus collection
describe("Menu collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockMenu;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("GET: menus/", async () => {
    const res = await request.get("/menus");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("POST: menus/", async () => {  
    mockMenu = {
      name: "Healthy Food",
      description: "Healthy menu for everybody",
      price: 1234,
      category: "Vegan",
      availability: 1
    };
    const res = (await request.post("/menus").send(mockMenu));
    docId = res.body.insertedId;
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });

  test("GET: menus/{id}", async () => {
    const res = await request.get("/menus/" + docId);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("PUT: menus/{id}", async () => {  
    mockMenu = {
      name: "Healthy Food 2",
      description: "Healthy menu for everybody",
      price: 1235,
      category: "Vegan",
      availability: 0
    };
    const res = (await request.put("/menus/" + docId).send(mockMenu));
    expect(res.statusCode).toBe(204);
  });

  test("DELETE: menus/{id}", async () => {
    const res = await request.delete("/menus/" + docId);
    expect(res.statusCode).toBe(200);
  });
});