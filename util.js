function pushData(data, col) {

  /* Find the index of lower bound timestamp using binary search technique
  *  to insert new record.
  */
  let index = lowBoundBinarySearch(data, col["timestamp"], 0, data.length);
  return new Array().concat(data.slice(0, index), [col], data.slice(index));
}


module.exports = { pushData };

// Low Bound Binary Search
function lowBoundBinarySearch(data, timestamp, low, high) {
  if (data.length > 0) {
    if (new Date(data[0]) > new Date(timestamp)) return 0;
    while (low < high) {
      let mid = Math.floor((high + low) / 2);

      if (new Date(timestamp) >= new Date(data[mid]["timestamp"])) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
  return 0;
}
