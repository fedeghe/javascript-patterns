/**
 * from category theory monoid is the combination of 
 * - a set S
 * - an operation O on it which 
 *  - the result is in S
 *  - is associative ( O(a, O(b, c)) == O(O(a, b), c) )
 *  - in S there is an element called identity such that O(I, a) == O(a, I) == a
 * 
 * examples of monoid
 * - string concatenation (Identity = '')
 */
'a'.concat('b'.concat('c')) === ('a'.concat('b')).concat('c')

'a'.concat('') === ''.concat('a') 
&& ''.concat('a') === 'a'

 


 /**
  * integer multiplication (Identity = 1)
  */
(7 * 3) * 4 === 7 * (3 * 4)

7 * 1 === 1 * 7
&& 7 * 1 === 7




 /**
  * function composition (Identity = (...a) => a)
  */
 function compose(a, b) {return function (o1, o2){
    return b(...a(o1, o2));
 }}


 function sum2(a, b) {return [a + 2, b + 2];}
 function sub2(a, b) {return [a - 2, b - 2];}
 function mult2(a, b) {return [a * 2, b * 2];}
 function identity(a, b) {return [a, b];}

 var c1 = compose(sum2, compose(sub2, mult2)),
    c2 = compose(compose(sum2, sub2), mult2),
    ci1 = compose(mult2, identity),
    ci2 = compose(identity, mult2);

JSON.stringify(c1(3, 5)) === JSON.stringify(c2(3, 5));
JSON.stringify(ci1(3, 5)) === JSON.stringify(ci2(3, 5));


ci1(3, 5) === ci2(3, 5);


 


 