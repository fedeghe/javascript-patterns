function Model(date){
    this.date = date;
}

function Presenter(_view){
    var view,
        model;
 
    function init(){
        view = _view;
        view.setHandler(function(v){
            var vals = v.split('.'),
                d = new Date(~~vals[0], ~~vals[1] - 1, vals[2]);
            view.setResult([
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ][d.getDay()])
        });
    }
    init();
    return {
        getView: function(){
            return view;
        },
        setModel: function(_model){
            model = _model;
            view.setModel(model);
        }
    };
}

function View(){
    var html = document.createDocumentFragment();
    var elements = {}
    function init(){
        elements.title = document.createElement('h1');
        elements.input = document.createElement('input');
        elements.button = document.createElement('button');
        elements.out = document.createElement('div');
        elements.title.innerText = 'Input Your Birth date (yyyy.mm.dd)';
        elements.input.setAttribute('type', 'text');
        elements.button.innerText = 'submit';
        html.appendChild(elements.title)
        html.appendChild(elements.input)
        html.appendChild(elements.button);
        html.appendChild(elements.out);
    }
    init();
    return {
        getHtml: function(){
            return html;
        },
        setModel: function(model){
            elements.input.value = model.date;
        },
        setHandler: function (handler) {
            elements.button.addEventListener('click', function () {
                handler(elements.input.value)
            }, false);
        },
        setResult: function (res) {
            elements.out.innerHTML = 'The entered date corresponds to a '+ res;
        }
    };
}


var model   = new Model("1976.09.20");
var task    = new Presenter(new View());
 
task.setModel(model);
 
document.body.appendChild(task.getView().getHtml());