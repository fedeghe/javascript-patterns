function arrayManipulation(n, queries) {
    var a = Array.from({length:n}, () => 0);
    queries.forEach(query => {
      a[query[0]-1] += query[2]
      a[query[1]] -= query[2]
    })
    return a.reduce((acc, el) => {
      acc.sum += el
      if (acc.sum > acc.mx) acc.mx = acc.sum
      return acc
    }, {sum: 0, mx: 0}).mx
  }