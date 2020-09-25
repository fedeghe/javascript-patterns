/**
in nlogn
restituire il numero ordinato di coppie in A che sommate fanno K
*/

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');




function solution(data) {
    var res = data.reduce(function(status, d) {
        status[0] = status[0] == undefined
                    ||
                    d.startedAt < status[0]
                    ? d.startedAt : status[0];
        status[1] = status[1] == undefined
                    || d.startedAt + d.ttl > status[1]
                    ? d.startedAt + d.ttl : status[1];
        return status;
    }, []);
    return res[1] - res[0];
}


module.exports = solution;