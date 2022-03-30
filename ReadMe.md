# Fetch Reward Test

## Background
Our users have points in their accounts. Users only see a single balance in their accounts. But for reporting purposes we actually track their points per payer/partner. In our system, each transaction record contains: payer (string), points (integer), timestamp (date).

For earning points it is easy to assign a payer, we know which actions earned the points. And thus which partner should be paying for the points. When a user spends points, they don't know or care which payer the points come from. But, our accounting team does care how the points are spent. 

There are two rules for determining what points to "spend" first:
- We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
- We want no payer's points to go negative.

## Execution Steps

- To start the server using `npm`, run the following command at root
  
  <pre>
  $ npm start
  <pre>
- To start the server using `nodemon`, run the following command at root
  
  <pre>
  $ nodemon
  <pre>
- To run tests, run the following command at root.
  <pre>
  $ npm test
  <pre>

> For any modifications, modify package.json or nodemon.json files for npm and nodemon respectively.


## Files Structure
<pre>
.
+-- index.js 
+-- main.js
+-- util.js
+-- impl.js
+-- test
|   +-- app.test.js
|   +-- test-constants.js
+-- package.json
+-- nodemon.json
+-- ReadMe.md
</pre>

**Details**
- Entry point is `index.js`
- `util.js` contains implementation of common functions needed for the main functionality.
- `impl.js` is the implementation of main functionality of the end points.
- `test` folder contains the test case related files.
- `package.json`, `nodemon.js` are configuration files needed for `npm` and `nodemon` respectively.


## End points

<details open > 
<summary style='border: 2px solid black;padding:5px;border-radius:10px;'>
    <b>/add</b>
</summary>
Pushed the record into the database.

<b>API End point</b>

<pre>
POST http://localhost:9090/add

Request Body Format:
{
    "payer": <payer-name>,
    "points": <points>,
    "timestamp": <timestamp> [sample format: "2021-03-01T14:00:00Z"]
}
</pre>

<b>Returns</b>
- The request returns status code `200` and `{code:200, msg: 'success'}` upon successful add operation.
- Returns status code `400` and `{code:200, msg: <error-msg>}` for failures.

<b>Example</b>
<pre>
Request:
POST http://localhost:9090/add
{
    "payer": "DANNON1",
    "points": -200,
    "timestamp": "2021-03-01T14:00:00Z"
}

Response:
{
  "code": 200,
  "msg": "success"
}
</pre>

</details>
 
<details style="margin-top:5px;">
<summary style='border: 2px solid black;padding:5px;border-radius:10px;'>
    <b>/spend</b>
</summary>
<br>

<b>API End point</b>
<pre>
POST http://localhost:9090/spend

Request Body Format:
{
    "points": <points-to-spend>,
}
</pre>

<b>Returns</b>

- List of all spent payers along with their points.
- If the points are insufficient or not available, then `Spend Fail` property will appear in the response [`Spend Fail: <points>`]

<b>Example</b>
<pre>
Request:
POST http://localhost:9090/spend
{
    "points": 450
}

Response:
{
    "DANNON1": 200,
    "Spend Fail": 250
}
</pre>

</details>
 
<details style="margin-top:5px;">
<summary style='border: 2px solid black;padding:5px;border-radius:10px;'>
    <b>/balance</b>
</summary>
<br>

<b>API End point</b>
<pre>
GET http://localhost:9090/balance
</pre>

<b>Returns</b>

- List of all payer remaining points.
- Returns empty list if none of the payers has any points.

<b>Example</b>
<pre>
Request:
GET http://localhost:9090/balance

Response:
{
  "DANNON1": 200
}
</pre>

</details>

## Flow

<img src="./FetchRewards.jpeg" />

#### Explanation:
- The Server will listen on 9090 port.
- There are three end points provided as explained in End points section.
- Server pushes the record to the `Database` for every `add` request and updates the record in `Data` based on the timestamp.
- Servers requests data from `Data` for every `spend` and `balance` request.
- The original data is kept untouched in the Database. all the operations are performed on `Data` object
- Thus, the `Data` and the `Database` will remain in sync at all times.

> The `Data` and the `Database` here are just two variables in the implementation.

## Implementation
- 
---
