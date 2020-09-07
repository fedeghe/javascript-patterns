/*
https://en.wikipedia.org/wiki/Front_controller
*/

function StudentView() {}
StudentView.prototype.display = function (params) {
    console.log('I`m a student', params);
};

function TeacherView() {}
TeacherView.prototype.display = function (params) {
    console.log('I`m a teacher', params);
};


function Dispatcher() {
    this.studentView = new StudentView();
    this.teacherView = new TeacherView();
}
Dispatcher.prototype.dispatch = function (req, params) {
    switch(req) {
        case 'Student':
            this.studentView.display(params);
            break;
        case 'Teacher':
            this.teacherView.display(params);
            break;
        default: break;
    }
};


function FrontController() {
    this.dispatcher = new Dispatcher();
}
FrontController.prototype.isAuthUser = function () {
    console.log('Auth ok')
    return true;
};
FrontController.prototype.trackRequest = function (req, params) {
    console.log('Traking: ', req, params);
};
FrontController.prototype.dispatchRequest = function (req, params) {
    this.trackRequest(req, params);
    if (this.isAuthUser()) {
        this.dispatcher.dispatch(req, params);
    }
};


var fc = new FrontController(); 
fc.dispatchRequest("Teacher", {id: 4}); 
fc.dispatchRequest("Student", [1,2,3]); 