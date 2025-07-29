// JavaScript code for the Waggin' Tails Maze Game
// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // constants for the game elements
    // dog element
    const dog = document.getElementById('dog');
    // start button
    const startButton = document.getElementById('start-game');
    // game container
    const gameContainer = document.getElementById('game-container');
    // title card
    const titleCard = document.querySelector('.title-card');
    // dog name input
    const dogNameInput = document.getElementById('dog-name');
    // victory card
    const victoryCard = document.querySelector('.victory-card');
    // reset button
    const resetButton = document.getElementById('reset');
    // fail screen
    const failCard = document.createElement('div');
    failCard.classList.add('fail-card');
    failCard.textContent = 'You hit a wall! Press Space to try again.';
    gameContainer.appendChild(failCard);

    // variables for the game elements
    // game status
    let gamePaused = true; // game is paused initially

    

    // function to start the game
    function startGame() {
        // change game status
        gamePaused = false;
        // hide the title card
        titleCard.style.display = 'none';
        // Initialize game elements here
        //console.log('Game started!');
        // display dog
        dog.style.display = 'block';
        // dog starts at 1,1
        dog.style.left = '1px';
        dog.style.top = '1px';
        // dog's text is dogNameInput value or default name
        dog.textContent = dogNameInput.value.trim() || 'Buddy'; // default name if input is empty
    }

    // function to make a wall at a specific position
    function createWall(fromY, fromX, toY, toX) {
        // create a new div element for the wall
        const wall = document.createElement('div');
        wall.classList.add('wall');
        wall.style.gridArea = `${fromY} / ${fromX} / ${toY} / ${toX}`;
        gameContainer.appendChild(wall);
        // console.log(wall);
    }

    // function to make a shelter at a specific position
    function createShelter(fromY, fromX, toY, toX) {
        // create a new div element for the shelter
        const shelter = document.createElement('div');
        shelter.classList.add('shelter');
        shelter.style.gridArea = `${fromY} / ${fromX} / ${toY} / ${toX}`;
        gameContainer.appendChild(shelter);
    }

    // function to make a home at a specific position
    function createHome(fromY, fromX, toY, toX) {
        // create a new div element for the home
        const home = document.createElement('div');
        home.classList.add('home');
        home.style.gridArea = `${fromY} / ${fromX} / ${toY} / ${toX}`;
        gameContainer.appendChild(home);
    }

    // function to generate the maze
    function generateMaze() {
        // make the walls
        createWall(4, 1, 21, 2);
        createWall(1, 4, 2, 21);
        createWall(20, 2, 21, 18);
        createWall(10, 20, 17, 21);
        createWall(17, 18, 18, 21);
        createWall(2, 5, 18, 7);
        createWall(5, 11, 8, 19);
        createWall(10, 9, 20, 10);
        createWall(9, 12, 15, 18);

        // make the shelter
        createShelter(2, 19, 6, 21);
        // make the home
        createHome(18, 18, 21, 21)
    }

    // function to check if the dog is in the shelter
    function checkDogInShelter() {
        const dogRect = dog.getBoundingClientRect();
        const shelterRect = document.querySelector('.shelter').getBoundingClientRect();

        if (dogRect.x < shelterRect.x + shelterRect.width &&
            dogRect.x + dogRect.width > shelterRect.x &&
            dogRect.y < shelterRect.y + shelterRect.height &&
            dogRect.y + dogRect.height > shelterRect.y) {
                // dog is in the shelter
                console.log('Dog is in the shelter!');
                // give dog the .has-owner class
                dog.classList.add('has-owner');
            }
    }

    // function to win the game
    function winGame() {
        // pause the game
        gamePaused = true;
        // display the victory card
        victoryCard.style.display = 'block';
    }

    // function to check if the dog is in the home
    function checkDogInHome() {
        const dogRect = dog.getBoundingClientRect();
        const homeRect = document.querySelector('.home').getBoundingClientRect();

        if (dogRect.x < homeRect.x + homeRect.width &&
            dogRect.x + dogRect.width > homeRect.x &&
            dogRect.y < homeRect.y + homeRect.height &&
            dogRect.y + dogRect.height > homeRect.y &&
            dog.classList.contains('has-owner')) {
                // dog is in the home
                console.log('Dog is home!');
                // pause the game
                gamePaused = true;
                // call winGame function
                winGame();
            }
        // elif dog in in the home but does not have an owner
        else if (dogRect.x < homeRect.x + homeRect.width &&
            dogRect.x + dogRect.width > homeRect.x &&
            dogRect.y < homeRect.y + homeRect.height &&
            dogRect.y + dogRect.height > homeRect.y) {
                // alert 'dog is not allowed in the home without an owner'
                alert('Dog is not allowed in the home without an owner!');
                //console.log('Dog is in the home but does not have an owner!');
                // reset the dog's position
                dog.style.left = '0px';
            }
    }

    // function to check check if the dog touches the wall
    function checkDogTouchesWall() {
        const dogRect = dog.getBoundingClientRect();
        const walls = document.querySelectorAll('.wall');
        // log walls
        //console.log(walls);

        // loop through each wall
        walls.forEach(wall => {
            const wallRect = wall.getBoundingClientRect();

            if (dogRect.x < wallRect.x + wallRect.width &&
                dogRect.x + dogRect.width > wallRect.x &&
                dogRect.y < wallRect.y + wallRect.height &&
                dogRect.y + dogRect.height > wallRect.y) {
                    // dog touches the wall
                    console.log('Dog touches the wall!');
                    // pause the game
                    gamePaused = true;
                    // reset the dog's position
                    dog.style.left = '0px';
                    dog.style.top = '0px';
                    // display the fail card
                    failCard.style.display = 'block';
                }
        });
    }

    // listen for click events on the start button
    startButton.addEventListener('click', () => {
        // start the game
        startGame();
        // generate the maze
        generateMaze();
        // log game status
        console.log('Game is running:', !gamePaused);
        // focus on the game container
        gameContainer.focus();
    });

    // listen for spacebar key to pause or resume the game
    document.addEventListener('keydown', (event) => {
        // if the fail card is displayed and the spacebar is pressed
        if (failCard.style.display === 'block' && event.code === 'Space') {
            // hide the fail card
            failCard.style.display = 'none';
            // reset the game
            gamePaused = !gamePaused; // resume the game
            // log game status
            console.log('Game is paused:', gamePaused);
        }
        // else if spacebar is pressed
        else if (event.code === 'Space') {
            gamePaused = !gamePaused;
            console.log('Game is paused:', gamePaused);
        }
    });

    dog.addEventListener('mouseover', (event) => {
        // log dog's left and top
        //console.log(`dog position on mouseover: ${dog.style.left},${dog.style.top}`)
        // log event.layerX and event.layerY
        //console.log(`Mouse position on mouseover: ${event.layerX}, ${event.layerY}`);
        if (!gamePaused) {
            // log half of event.layerX
            //console.log(`Half of x ${event.layerX / 2}`)
            // log the type of half of event.layerX

            // dog.style.left should be moved to the left by half of event.layerX
            dog.style.left = `${parseInt(dog.style.left) - event.layerX / 2}px`;
            // dog.style.top should be moved up by half of event.layerY
            dog.style.top = `${parseInt(dog.style.top) + event.layerY / 2}px`;
        }
    });

    // listen for mousemove events on dog
    dog.addEventListener('mousemove', (event) => {
        // log event.layerX and event.layerY
        // if the game is not paused
        if (!gamePaused) {
            // get the bounding rectangle of the game container
            const containerRect = gameContainer.getBoundingClientRect();
            // calculate the mouse position relative to the container
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;
            // move the dog to the mouse position
            dog.style.left = `${mouseX - dog.offsetWidth / 2}px`;
            dog.style.top = `${mouseY - dog.offsetHeight / 2}px`;
        }
        // check if the dog is in the shelter
        checkDogInShelter();
        // check if the dog is in the home
        checkDogInHome();
        // check if the dog touches the wall
        checkDogTouchesWall();
    });

    // listen for click events on the reset button
    resetButton.addEventListener('click', () => {
        // refresh the page to reset the game
        location.reload();
    });

});

