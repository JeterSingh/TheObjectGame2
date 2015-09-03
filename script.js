//Logic
//Conditions
//Loops
//arrays
//constructors
//callbacks

//Constants
var startingHealth= 100;
var startingHits= 0;
var playerName= "PlayerName";

// Item Constructor HERE
var ReduceDamage = function(name, modifier, description){
    this.name = name;
    this.modifier = modifier;
    this.description = description;
    this.draw = function(){
       return '<div class="item">'+ this.name +'</div>'; //added to body upshift challenge
    }
}



//global items placeholder HERE
var items = {
  shield: new ReduceDamage("Shield",1,"This is an awesome shield!"),
  forcefield: new ReduceDamage("Forcefield",2,"This is an awesome forcefield!"),
  deflector: new ReduceDamage("Deflector",3,"This is an awesome deflector!")
};

var player = {
  name: "PlayerName",
  health: startingHealth,
  hits: startingHits,
  items:[items.shield, items.forcefield, items.deflector],  //we added this text
  
  slap: function() {
    this.hit(1);
  },
  punch: function() {
    this.hit(5);
  },
  kick: function() {
    this.hit(10);
  },
  addMods: function() {
    var total = 0;
    for (var i = 0; i < player.items.length; i++) {
      total += player.items[i].modifier;
    }
    return total;
  },
  
  hit: function(damage) {
    this.health = this.health - damage + this.addMods();
    this.hits++;
    if (this.health <= 0) {
      this.health = 0;
    }
    update();
  },
  reset: function() {
      this.health = startingHealth,
      this.hits = startingHits,
    update();
  }
  
}

function update() {
  document.getElementById("health").innerText = player.health;
  document.getElementById("name").innerText = player.name;
  document.getElementById("hits").innerText = player.hits;
  
  //IF HEALTH STATEMENT
  if(player.health <=0) {
    document.getElementById("player-panel").classList.add("panel-danger")
  } else{
    document.getElementById("player-panel").classList.remove("panel-danger")
  } 
  drawItems();
}
function drawItems() {
  var toDraw = "";
  for (var i = 0; i < player.items.length; i++) {
    toDraw += player.items[i].draw()
  }
  document.getElementById("player-items").innerHTML = toDraw;
}
update();