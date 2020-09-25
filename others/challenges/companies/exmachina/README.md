### Three tasks  

use es3

#### 1  
You must invoke always the same function with N fixed parameters at the beginning and M parameters that vary between every call.
Create a function which allows you to do that but passing only once the fixed initial N parameters.


``` js  
function evalTpl (tpl, fixedVars) {
    var out = tpl;
    evalTpl = function (vars) {
        var spec
        for (var v in vars) {
            spec = out.replace('${' + v + '}', vars[v])
        }
        return spec;
    }
    for (var v in fixedVars) {
        out = out.replace('${' + v + '}', fixedVars[v])
    }
    return out
}

var start = evalTpl(
    '<html>'+
        '<head>'+
            '<title>${title}</title>'+
        '</head>'+
        '<body>${content}</body>'+
    '</html>',
    {
        title: 'This is the title'
    }
);
console.log(start)
var s1 = evalTpl({content: 'This is one body'}),
    s2 = evalTpl({content: 'This is a different body'});
console.log(s1);
console.log(s2);

```