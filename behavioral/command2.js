function BringTroopsCommand(location, numberOfTroops, when) {
    this._location = location;
    this._numberOfTroops = numberOfTroops;
    this._when = when;
}
BringTroopsCommand.prototype.Execute = function() {
    var receiver = new LordInstructions();
    receiver.BringTroops(this._location, this._numberOfTroops, this._when);
};


function LordInstructions() {}
LordInstructions.prototype.BringTroops = function(location, numberOfTroops, when) {
    console.log("You have been instructed to bring " +numberOfTroops + " troops to " + location + " by " + when);
};
