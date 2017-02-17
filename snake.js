  //Create the canvas and setting its properties.
  var canvas = document.createElement('canvas');
  //Set the canvas attributes.
  canvas.id = 'gameCanvas';
  canvas.width = 450;
  canvas.height = 450;
  canvas.style.border = '10px solid #eee';

  //Get the body element and append the canvas to the page.
  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundColor = '#000';
  body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
      canvaswidth = canvas.offsetWidth;
      canvasheight = canvas.offsetHeight;
      size = 10; //setting the width for the snake/food cells

  var direction;
  var food;
  var snake_array; //an array of cells to make up the snake

  //Creating an array for the snake body.
  function create_snake()
  {
    var length = 3; //Length of the snake
    snake_array = []; //Empty array to start with
    for(var i = length-1; i>=0; i--)
    {
      //This will create a horizontal snake starting from the top left
      snake_array.push({x: i, y:0});
    }
  }

  //Creating the food with its x y properties set to random, so it can appear in different places on the canvas
  function create_food()
  {
    food = {
      x: Math.round(Math.random()*(canvaswidth)/size),
      y: Math.round(Math.random()*(canvasheight)/size),
    };
    //This will create a cell with x/y between 0-44
  }

  //Generic function to paint the cells on the page
  function paint_cell(x, y, color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*size, y*size, size, size);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(x*size, y*size, size, size);
  }

  function cashmeousside()
  {
    //Paint the canvas background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvaswidth, canvasheight);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0, 0, canvaswidth, canvasheight);

    //Setting the position of the snake head cell
    var posX = snake_array[0].x;
    var posY = snake_array[0].y;

    //Increment posX and posY based on the direction the snake moves
    switch(direction) {
      case 'right':
            posX++;
            break;

      case 'left':
            posX--;
            break;

      case 'up':
            posY--;
            break;

      case 'down':
            posY++;
            break;
    }

    //Movement of the snake
    var tail = snake_array.pop(); //Remove the tail from the snake array
    tail.x = posX; tail.y = posY; //Position of the next cell the snake will move into

    snake_array.unshift(tail); //Shift the tail to the front of the array which is the head

    for(var i = 0; i < snake_array.length; i++)
    {
      var color = snake_array[i];
      paint_cell(color.x, color.y, 'green'); //Paint the snake cells
    }

    paint_cell(food.x, food.y, 'red'); //Paint the snake food cell
  }

  function init()
  {
    direction = 'right'; //default direction for snake to move
    create_snake();
    create_food();

    //Lets move the snake now using a timer which will trigger the paint function every ms
    if(typeof game_loop != 'undefined')
      clearInterval(game_loop);
      game_loop = setInterval(cashmeousside, 200);
  }

  init();

  //Make the snake controllable by keyboard
  window.addEventListener('keydown', function(event) {
    var keyCode = event.which;

    if(keyCode == '37' && direction != 'right') {
        direction = 'left';
    } else if(keyCode == '38' && direction != 'down') {
        direction = 'up';
    } else if(keyCode == '39' && direction != 'left') {
        direction = 'right';
    } else if(keyCode == '40' && direction != 'up') {
        direction = 'down';
    } else if(keyCode == '32') {
        clearInterval(game_loop);
    }
  });
