function jumpingOnClouds(c) {
    var r = 0;
    for (var i = 0, l = c.length - 1; i < l; i++) {
        if (c[i + 2] === 0) i++
        r++;
    }
    return r;
}