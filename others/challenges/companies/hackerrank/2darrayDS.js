function hourglassSum(arr) {
    var max = -Infinity,
        s = 6;
    function checkMax(r, c){
      var rm = r - 1,
          rp = r + 1,
          sum = arr[rm][c-1] + arr[rm][c] + arr[rm][c+1] +
            arr[r][c] +
            arr[rp][c-1] + arr[rp][c] + arr[rp][c+1];
      if (max < sum) max = sum
    }
    for (var i = 1; i < s-1; i++) {
      for (var j = 1; j < s-1; j++) {
        checkMax(i, j)
      }
    }
    return max
}