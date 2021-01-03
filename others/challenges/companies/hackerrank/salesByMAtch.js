function sockMerchant(n, ar) {
    return ar.reduce(function (acc, el) {
        if (acc.els[el]) {
            acc.n++;
            delete acc.els[el]
        } else {
            acc.els[el] = true
        }
        return acc
    }, { els: {}, n: 0 }).n
}