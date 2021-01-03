function countingValleys(steps, path) {
    var r = 0,
        l = 0,
        st = path.split(''),
        dir;
    for (var i = 0; i < steps; i++) {
        dir = st[i] === 'U' ? 1 : -1;
        l += dir;
        if (dir === 1 && l === 0) r++
    }
    return r;
}