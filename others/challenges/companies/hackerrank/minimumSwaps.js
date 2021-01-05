function minimumSwaps(arr) {
    var i = 0, j,
        swaps = 0,
        tmp,
        len = arr.length;
      for (null; i < len; i++) {
        if (arr[i] === i + 1) continue;
        j = arr[i]-1
        tmp = arr[i];
        arr[i] = arr[j]
        arr[j] = tmp;
        swaps++;
        i--;
      }
      return swaps;
  }