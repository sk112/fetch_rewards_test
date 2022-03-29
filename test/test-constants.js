/**
 * Test Case 1: Simple Test Case
 */
const request2 = [
  /* 1.add       */ { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  /* 2.add       */ { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z", },
  /* 3.add       */ { payer: "DANNON", points: -200, timestamp: "2020-10-31T15:00:00Z" },
  /* 4.add       */ { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
  /* 5.add       */ { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
  /* 6.balance   */ null,
  /* 7.points    */ { points: 100 },
  /* 8.balance   */ null,
  /* 9.points    */ { points: 5000 },
  /* 10.balance  */ null
]

const response2 = [
  /* 1.add       */ 200,
  /* 2.add       */ 200,
  /* 3.add       */ 200,
  /* 4.add       */ 200,
  /* 5.add       */ 200,
  /* 6.points    */ { DANNON: 1100, UNILEVER: 200, 'MILLER COORS': 10000 },
  /* 7.balance   */ { DANNON: -100 },
  /* 8.balance   */ { DANNON: 1000, UNILEVER: 200, 'MILLER COORS': 10000 },
  /* 9.points    */ { DANNON: 0, UNILEVER: -200, 'MILLER COORS': -4800 },
  /* 10.balance  */ { DANNON: 1000, UNILEVER: 0, 'MILLER COORS': 5200 }
]

/**
 * TestCase 1: Earn while Spend Test case
 */
const request1 = [
  /* 1.add       */ { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  /* 2.add       */ { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
  /* 3.balance   */ null,
  /* 4.points    */ { points: 100 },
  /* 5.balance   */ null,
  /* 6.add       */ { payer: "DANNON", points: -200, timestamp: "2020-10-31T15:00:00Z" },
  /* 7.add       */ { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
  /* 8.balance   */ null,
  /* 9.points    */ { points: 100 },
  /* 10.balance  */ null,
  /* 11.add      */ { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
  /* 12.balance  */ null,
  /* 13.points   */ { points: 5000 },
  /* 14.balance  */ null,
  /* 15.points   */ { points: 10000 },
]

const response1 = [
  /* 1.add       */ 200,
  /* 2.add       */ 200,
  /* 3.balance   */ { DANNON: 1000, UNILEVER: 200 },
  /* 4.points    */ { UNILEVER: -100 },
  /* 5.balance   */ { DANNON: 1000, UNILEVER: 100 },
  /* 6.add       */ 200,
  /* 7.add       */ 200,
  /* 8.balance   */ { DANNON: 800, UNILEVER: 100, 'MILLER COORS': 10000 },
  /* 9.points    */ { UNILEVER: -100 },
  /* 10.balance  */ { DANNON: 800, UNILEVER: 0, 'MILLER COORS': 10000 },
  /* 11.add      */ 200,
  /* 12.balance  */ { DANNON: 1100, UNILEVER: 0, 'MILLER COORS': 10000 },
  /* 13.points   */ { DANNON: -100, 'MILLER COORS': -4900 },
  /* 14.balance  */ { DANNON: 1000, 'MILLER COORS': 5100, UNILEVER: 0 },
  /* 15.points   */ { DANNON: -1000, 'MILLER COORS': -5100, 'Spend Fail': 3900 },
]


/**
 * Null Test Cases
 */
const request0 = [
  /* 1.balance  */ null,
  /* 2.points   */ { points: 100 },
  /* 3.balance  */ null,
  // /* 4.add      */ { payer: 'testuser', points: 100, timestamp: "2020-10-31T10:00:00Z"},
  /* 5.points   */ { points: 200 },
  /* 6.balance  */ null
]

const response0 = [
  /* 1.balance  */ {},
  /* 2.points   */ { 'Spend Fail': 100 },
  /* 3.balance  */ {},
  // /* 4.add      */ 200,
  /* 5.points   */ { 'Spend Fail': 200 },
  /* 6.balance  */ {}
]


module.exports = {
  request1, response1, request2, response2, request0, response0
}