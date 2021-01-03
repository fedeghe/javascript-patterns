function repeatedString(s, n) {
    function inStr(str) {
        var has = str.match(/a/g);
        return has ? has.length : 0;
    }
    var l = s.length,
        inOne = inStr(s);
    if (!inOne) return 0
    return inStr(s.substring(0, n % l)) + inOne * Math.floor(n / l)
}