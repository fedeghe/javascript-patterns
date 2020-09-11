function Person (params) {
    var data = {};
    function _Person(d) {data = d;}
    _Person.prototype.sayHelloTo = function (who) {
      console.log('hello ' + who + ', my name is ' + data.name);
    };
    return new _Person(params);
  }
  
  var p1 = new Person({name:'Jeff'}),
    p2 = new Person({name:'Federico'});

  p1.sayHelloTo('eveyone');

  p2.sayHelloTo('community');