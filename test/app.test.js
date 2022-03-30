const request = require("supertest");
const app = require("../main.js");

const { request1, response1, request2, response2, request0, response0 } = require("./test-constants.js");


describe('Null Test cases 0', () => {
  for (let i in request0) {
    if (request0[i] === null) {
      it(i + "Balance", async () => {
        const response = await request(app)
          .get("/balance")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            // console.log(response.body)
            expect(response.body)
              .toStrictEqual(response0[i]);
          });
      })
    } else if (request0[i].hasOwnProperty('payer')) {
      it(i + "Add Transaction", async () => {
        const response = await request(app)
          .post("/add")
          .send(request0[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
      });
    } else {
      it(i + "Spend points - " + request0[i]['points'], async () => {
        const response = await request(app)
          .post("/spend")
          .send(request0[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body)
              .toStrictEqual(response0[i]);
          });
      });
    }
  }
})

describe('Test case 1', () => {
  for (let i in request1) {
    if (request1[i] === null) {
      it(i + "Balance", async () => {
        const response = await request(app)
          .get("/balance")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            // console.log(response.body)
            expect(response.body)
              .toStrictEqual(response1[i]);
          });
      })
    } else if (request1[i].hasOwnProperty('payer')) {
      it(i + "Add Transaction", async () => {
        const response = await request(app)
          .post("/add")
          .send(request1[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
      });
    } else {
      it(i + "Spend points - " + request1[i]['points'], async () => {
        const response = await request(app)
          .post("/spend")
          .send(request1[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body)
              .toStrictEqual(response1[i]);
          });
      });
    }
  }
})

describe("Test Case 2", () => {
  for (let i in request2) {
    if (request2[i] === null) {
      it(i + "Balance", async () => {
        const response = await request(app)
          .get("/balance")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            // console.log(response.body)
            expect(response.body)
              .toStrictEqual(response2[i]);
          });
      })
    } else if (request2[i].hasOwnProperty('payer')) {
      it(i + "Add Transaction", async () => {
        const response = await request(app)
          .post("/add")
          .send(request2[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
      });
    } else {
      it(i + "Spend points - " + request1[i]['points'], async () => {
        const response = await request(app)
          .post("/spend")
          .send(request2[i])
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body)
              .toStrictEqual(response2[i]);
          });
      });
    }
  }

});
