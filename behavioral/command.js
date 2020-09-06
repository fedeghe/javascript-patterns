
function add_op(x, y) {return x + y;}
function sub_op(x, y) {return x - y;}
function mul_op(x, y) {return x * y;}
function div_op(x, y) {return x / y;}

var Command = function(execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

function AddCommand(value) {return new Command(add_op, sub_op, value);};
function SubCommand(value) {return new Command(sub_op, add_op, value);};
function MulCommand(value) {return new Command(mul_op, div_op, value);};
function DivCommand(value) {return new Command(div_op, mul_op, value);};

var Calculator = function() {
    var currentValue = 0,
        commands = [];

    return {
        execute: function(command) {
            currentValue = command.execute(currentValue, command.value);
            commands.push(command);
        },
        undo: function() {
            var command = commands.pop();
            currentValue = command.undo(currentValue, command.value);
        },
        getCurrentValue: function() {
            return currentValue; }
    }
}


var calculator = new Calculator();

// issue commands

calculator.execute(AddCommand(100));
calculator.execute(SubCommand(24));
calculator.execute(MulCommand(6));
calculator.execute(DivCommand(2));

// reverse last two commands
console.log(calculator.getCurrentValue());
calculator.undo();
console.log(calculator.getCurrentValue());
calculator.undo();
console.log(calculator.getCurrentValue());
