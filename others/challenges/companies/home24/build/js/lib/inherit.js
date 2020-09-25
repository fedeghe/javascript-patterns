H24.makeNS('H24.core');
/**
 * basic prototypal inheritance 
 * @param  {function} Child  the constructor function for child element
 * @param  {function} Parent the constructor function for parent element
 * @return {undefined}
 */
H24.core.inherit = function (Child, Parent) {
    function U() {}
    U.prototype = Parent.prototype;
    Child.prototype = new U();
    Child.prototype.constructor = Child;
    Child.superClass = Parent.prototype;
    Child.baseConstructor = Parent;
};