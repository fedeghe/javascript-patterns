function arrayManipulation(n, queries) {
    var a = Array.from({length:n}, () => 0);
    queries.forEach(query => {
      for (var i = query[0]-1, l = query[1]; i < l; i++) {
        a[i] = a[i] + query[2]
      }
    })
    return Math.max.apply(null, a)
  }