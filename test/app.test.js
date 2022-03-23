const request = require("supertest");
const app = require("../main.js");

const consts = require("./constants.js");

describe("POST /add ", () => {
  // it("It should respond with an an array of length 1", async () => {
  //   const response = await request(app)
  //     .post("/add")
  //     .send({
  //       payer: "DANNON",
  //       points: 1000,
  //       timestamp: "2022-11-02T14:00:00Z",
  //     })
  //     .set("Accept", "application/json")
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then(async (response) => {
  //       // console.log(typeof response.text)
  //       // expect(Array.isArray(response.body)).toBeTruthy();
  //       // expect(response.body.length).toEqual(1);
  //       // expect([
  //       //   {
  //       //     payer: "DANNON",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       // ]).toStrictEqual([
  //       //   {
  //       //     payer: "DANNON",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       // ]);
  //     });
  // });

  // it("It should respond with an an array", async () => {
  //   const response = await request(app)
  //     .post("/add")
  //     .send({
  //       payer: "DANNON",
  //       points: 1000,
  //       timestamp: "2022-11-02T14:00:00Z",
  //     })
  //     .set("Accept", "application/json")
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then(async (response) => {
  //       // expect(Array.isArray(response.body)).toBeTruthy();
  //       // expect([
  //       //   {
  //       //     payer: "DANNON",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       //   {
  //       //     payer: "DANNON1",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       // ]).toStrictEqual([
  //       //   {
  //       //     payer: "DANNON",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       //   {
  //       //     payer: "DANNON1",
  //       //     points: 1000,
  //       //     timestamp: "2022-11-02T14:00:00Z",
  //       //   },
  //       // ]);
  //     });
  // });

  // it("It should respond with an error 400", async () => {
  //   const response = await request(app)
  //     .post("/add")
  //     .send({})
  //     .set("Accept", "application/json")
  //     .expect("Content-Type", /json/)
  //     .expect(400);
  // });

  it("It should respond with status 200", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        payer: "DANNON",
        points: 1000,
        timestamp: "2020-11-02T14:00:00Z",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("It should respond with status 200", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        payer: "UNILEVER",
        points: 200,
        timestamp: "2020-10-31T11:00:00Z",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("It should respond with status 200", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        payer: "DANNON",
        points: -200,
        timestamp: "2020-10-31T15:00:00Z",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("It should respond with status 200", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        payer: "MILLER COORS",
        points: 10000,
        timestamp: "2020-11-01T14:00:00Z",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("It should respond with status 200", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        payer: "DANNON",
        points: 300,
        timestamp: "2020-10-31T10:00:00Z"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((r) => console.log(r.body));
  });
});

// { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
// { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
// { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
// { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
// { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }

describe("Payer and Balance Tests", () => {
  it("Scenario 1: Spend less points", async () => {
    const response = await request(app)
      .post("/spend")
      .send({ points: 100 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });

  it("Scenario 2: Balance", async () => {
    const response = await request(app)
      .get("/balance")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });

  it("Scenario 3: Spend more than available points", async () => {
    const response = await request(app)
      .post("/spend")
      .send({ points: 5000 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });

  it("Scenario 4: Balance", async () => {
    const response = await request(app)
      .get("/balance")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });
});

describe('', () => {
  
})


// {
//   "payer": "DANNON1",
//   "points": -1000,
//   "timestamp": "2020-03-01T14:00:00Z"
// },
// {
//   "payer": "DANNON3",
//   "points": 1500,
//   "timestamp": "2020-04-01T14:00:00Z"
// },
// {
//   "payer": "DANNON1",
//   "points": 1000,
//   "timestamp": "2020-05-01T14:00:00Z"
// },
// {
//   "payer": "DANNON2",
//   "points": 100,
//   "timestamp": "2020-05-01T14:00:00Z"
// },
// {
//   "payer": "DANNON1",
//   "points": -100,
//   "timestamp": "2020-05-01T14:00:00Z"
// },
// {
//   "payer": "DANNON3",
//   "points": 500,
//   "timestamp": "2020-06-01T14:00:00Z"
// },
// {
//   "payer": "DANNON5",
//   "points": 600,
//   "timestamp": "2020-08-01T14:00:00Z"
// },
// {
//   "payer": "DANNON1",
//   "points": -1000,
//   "timestamp": "2020-08-01T14:00:00Z"
// },
// {
//   "payer": "DANNON3",
//   "points": 600,
//   "timestamp": "2020-09-01T14:00:00Z"
// }
// {
//   "DANNON1": 100,
//   "DANNON3": -2000,
//   "DANNON2": -100
// }

// 
// {
//   "payer": "DANNON1",
//   "points": -200,
//   "timestamp": "2021-03-01T14:00:00Z"
// }