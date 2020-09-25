

var data = [
        ['Samsung Galaxy S4','Samsung','April 2013',38,'4560'],
        ['Lumia 1020','Nokia','July 2013',2,'1560'],
        ['Surface 2 Pro','Microsoft','September 2013',12,'53782'],
        ['iPhone 5s','Apple','September 2013',53,'134500'],
        ['One X','HTC','March 2012',7,'213068'],
        ['G 2','LG','October 2013',34,'133068'],
        ['Yoga 2 Pro','Lenovo','November 2013',4,'4230']
    ],
    headers = [
        'Product Name',
        'Product Manufacturer',
        'Release Date',
        'Quantity',
        'Purchase Value'
    ];

function ProductTable(config) {
    this.headData = config.head || false;
    this.bodyData = config.body ||false;
    if (!this.headData || !this.bodyData) {
        throw new Error('Missing parameters');
    }
    this.node = null;
}
ProductTable.prototype.drawLine = function (tag, data){
    var head = document.createElement('tr');
    for (var i = 0, l = data.length, t; i < l; i++) {
        t = document.createElement(tag);
        t.innerHTML = data[i] + '';
        head.appendChild(t);
    }
    return head;
};

ProductTable.prototype.drawHeader = function (){
    this.node.appendChild(
        this.drawLine('th', this.headData)
    );
};
ProductTable.prototype.drawData = function (){
    for(var j = 0, k = this.bodyData.length; j < k; j++){
        this.node.appendChild(
            this.drawLine('td', this.bodyData[j])
        );
    }
};
ProductTable.prototype.draw = function (){
    this.drawHeader();
    this.drawData();
    document.body.appendChild(this.node);
};
ProductTable.prototype.render = function (){
    this.node = document.createElement('table'); 
    this.draw();
}
ProductTable.prototype.sortByColumn = function (col) {
    var index = this.headData.indexOf(col);
    if (index === -1){
        throw new Error(col + ' column not found');
    }
    this.bodyData.sort(function (l1, l2) {
        return parseInt(l1[index], 10) < parseInt(l2[index], 10);
    });
}


var pt = new ProductTable({head : headers, body : data});
pt.sortByColumn('Quantity');
pt.render();






















/*
It will go for 100 iterations and will:
- print to console/screen "Fizz" every 3 
- print to console/screen "Buzz" every 5 
- print to console/screen "FizzBuzz" every 15
*/
var i =0,l =100,
    out ={'3' : 'Fizz', '5' : 'Buzz', '15' : 'FizzBuzz'};
while (i < l) {
	console.debug(‘—’)
	console.debug(i);
    for (j in out) {
        !(~~i%j) && console.debug(i, out[j]);
    }
    i++;
}
