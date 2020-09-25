module.exports = {
    isRect : function (s) {
        return (s[0] == s[2]) && (s[1] == s[3]);
    },
    isSquare : function (s) {
        return (s[0] | s[1] | s[2]) == s[3];
    },
    str2intArr : function (arr) {
        return arr.map(function (d){return parseInt(d, 10);});
    }
};