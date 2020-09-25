function ChannelFilter(a) {this.arr = a;}

ChannelFilter.prototype.removeDuplicates = function (k) {
    this.arr = this.arr.reduce((uniqArray, item) => {
        if (uniqArray.some(
            uniqItem => uniqItem[k] === item[k]
        )) return uniqArray;
        uniqArray.push(item);
        return uniqArray;
    }, []);
    return this;
};

ChannelFilter.prototype.leaveBestQualities = function () {
    const order = {
        sd: 0,
        hd: 1,
        uhd: 2
    };
    this.arr = this.arr.map((a, i) =>
        Object.assign({}, a, {
            channelNumber: ('000' + i).match(/(\d{3})$/)[1],
            isFavorite : Math.random() < .05,
            qualities: a.qualities.sort(
                (e1, e2) => order[e1.level] < order[e2.level]
            ).slice(0, 1)
        })
    );
    return this;
};

ChannelFilter.prototype.removeUnavailables = function () {
    this.arr = this.arr.filter((item) => {
        return item.qualities.some(
            q => q.availability === 'available'
        );
    }, []);
    return this;
};


function filterChannels(channels) {
    const f = new ChannelFilter(channels);
    return f.removeUnavailables()
        .removeDuplicates('id')
        .leaveBestQualities()
        .arr;
}

export {
    filterChannels,
    ChannelFilter //only for testing purposes
};
