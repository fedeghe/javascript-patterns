function memoize( fn ) {

    return function () {
        var args = [].slice.call(arguments),
            hash = "",
            i = args.length;
        currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            	JSON.stringify(currentArg)
            	:
            	currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize) ?
        	fn.memoize[hash] :
        	fn.memoize[hash] = fn.apply(this, args);
    };
    
}
function collatz_rec(n, i){
  return i ?
  	collatz_rec(n&1 ? n*3+1 : n>>1, i-1)
  	:
  	n;
}



function collatz_ite(n, i){
	while (i--) n = n&1 ? (n<<1) +n+1 : n>>1;
	return n;
}

var collatz_m = memoize(collatz_ite);
for (var i =0; i < trials; i++) {
	collatz_m(5E12, i);
}

function collatz_speed(n, i) {
	function f(n, m){
		m = n%4;
		if (m === 0) {
			return n>>2;
		}else if(m === 1){
			return 3*g(n) + 1;
		}else if(m === 2){
			return n>>1;
		}else if(m === 3){
			return (3*n+1)>>1;
		}
	}
	function g(n){
		return n%4===1 ? g((n-1)>>2) : n
	}
	while (i) {
		n = f(n);
		i--;
	}
	return n;
}


var trials = 100,
	base = 5E12,
	n = 100,
	t1 = 0,
	t2 = 0,
	t3 = 0,
	r1 = [], r2 = [], r3 = [],
	i1 = 0, i2 = 0, i3 = 0;
/*
t1 = +new Date;
for(null; i1 < trials; i1++) {
	r1.push(collatz_rec(base, i1));
}
t1 = +new Date - t1;
*/
t2 = +new Date;
for(null; i2 < trials; i2++) {
	r2.push(collatz_ite(base, i2));
}
t2 = +new Date - t2;

t3 = +new Date;
for(null; i3 < trials; i3++) {
	r3.push(collatz_m(base, i3));
}
t3 = +new Date - t3;


console.log(r1, r2, r3);
console.log(t1, t2, t3);