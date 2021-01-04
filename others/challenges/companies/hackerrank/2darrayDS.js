function hourglassSum(arr) {
    var max = -Infinity,
        s = 6,
        i, j;
    function checkMax(r, c){
      var rm = r - 1,
          rp = r + 1,
          cm = c - 1,
          cp = c + 1,
          sum = arr[rm][cm] + arr[rm][c] + arr[rm][cp] +
            arr[r][c] +
            arr[rp][cm] + arr[rp][c] + arr[rp][cp];
      if (max < sum) max = sum
    }
    for (i = 0; i < s - 1; i++) {
      for (j = 0; j < s - 1; j++) {
        checkMax(i, j)
      }
    }
    return max
}