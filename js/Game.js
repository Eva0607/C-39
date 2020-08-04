class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      car1 = createSprite(100,200);
      car1.addImage("car1", car1_img);
      car2 = createSprite(300,200);
      car2.addImage("car2", car2_img);
      car3 = createSprite(500,200);
      car3.addImage("car3", car3_img);
      car4 = createSprite(700,200);
      car4.addImage("car4", car4_img);
      cars = [car1,car2,car3,car4];

    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background("#c68767");
      image(track,0, -displayHeight*4,displayWidth, 5*displayHeight );
      var index = 0;
      var x = 220;
      var y = 0;
      var display_position = 130;

      for(var plr in allPlayers){
        index = index + 1;
        x = x + 220;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if(index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y =cars[index - 1].y;
        }

      }  
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;

    }


    drawSprites();
  }

  end(){
    game.update(2);

  }
}
