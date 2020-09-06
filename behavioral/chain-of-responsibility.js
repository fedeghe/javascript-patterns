// rev.1

function Problem(l) {this.difficulty = l;}

function Genious(l) {this.geniality = l;}

Genious.prototype.canSolve = function(problem) {
	var canSolve = problem.difficulty <= this.geniality;
	console.log(canSolve ? 'hahah too easy' : 'sorry too hard ('+problem.difficulty+' > '+this.geniality+')')
    return canSolve;
};
Genious.prototype.solve = function(problem) {return "0";};


function ProblemResolver() {
    this.problemSolvers = arguments;
}
ProblemResolver.prototype.ResolveProblem = function(problem) {	
    for (var i = 0, l = this.problemSolvers.length; i < l; i++) {
        if (this.problemSolvers[i].canSolve(problem)) {
            return this.problemSolvers[i].solve(problem);
        }
    }
};

var solver = new ProblemResolver(
		new Genious(1),
		new Genious(5),
		new Genious(10),
		new Genious(15),
		new Genious(100)
	),
	solution1 = solver.ResolveProblem(new Problem(10)),
	solution2 = solver.ResolveProblem(new Problem(50)),
	solution3 = solver.ResolveProblem(new Problem(100)),
	solution4 = solver.ResolveProblem(new Problem(110));

console.log('The solution1: ' + solution1);
console.log('The solution2: ' + solution2);
console.log('The solution3: ' + solution3);
console.log('The solution4: ' + solution4);