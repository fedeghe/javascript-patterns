function Participant(name) {
    this.name = name;
    this.chatroom = null;
};
 
Participant.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
};
 
var Chatroom = function() {

    var participants = {};
 
    return {
 
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
            return this;
        },
        leave : function (partecipant) {
        	participants[participant.name] = null;
        	delete participants[participant.name];
            participant.chatroom = null;
        },
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in participants) {   
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
 
var yoko = new Participant("Yoko"),
	john = new Participant("John"),
	paul = new Participant("Paul"),
	ringo = new Participant("Ringo"),
	chatroom = Chatroom();

chatroom.register(yoko);
chatroom.register(john);
chatroom.register(paul);
chatroom.register(ringo);

yoko.send("All you need is love.");
yoko.send("I love you John.");
john.send("Hey, no need to broadcast", yoko);
paul.send("Ha, I heard that!");
ringo.send("Paul, what do you think?", paul);
ringo.send("Paul, what do you think?", paul);

log.show();