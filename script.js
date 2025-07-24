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
        // dog's text is dogNameInput value or default name
        dog.textContent = dogNameInput.value.trim() || 'Buddy'; // default name if input is empty
    }

    // // function to make the dog
    // function createDog(name) {
    //     // create a new div element for the dog
    //     const newDog = document.createElement('div');
    //     newDog.classList.add('dog');
    //     newDog.textContent = name;
    //     gameContainer.appendChild(newDog);
    //     // log the dog's data
    //     //console.log(newDog);
    //     var dog = document.querySelector('.dog');
    // }

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
        createWall(1, 4, 1, 21);
        createWall(1, 4, 10, 4);
        createWall(5, 11, 9, 19);
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
                console.log('Dog is in the home but does not have an owner!');
            }
    }

    // function to check check if the dog touches the wall
    function checkDogTouchesWall() {
        const dogRect = dog.getBoundingClientRect();
        const wallRects = document.querySelectorAll('.wall');
        // log wallRects
        console.log(wallRects);

        wallRects.forEach(wallRect => {
            if (dogRect.x < wallRect.x + wallRect.width &&
                dogRect.x + dogRect.width > wallRect.x &&
                dogRect.y < wallRect.y + wallRect.height &&
                dogRect.y + dogRect.height > wallRect.y) {
                    // dog is touching the wall
                    console.log('Dog is touching the wall!');
                }
        });
    }

    // listen for click events on the start button
    startButton.addEventListener('click', () => {
        // start the game
        startGame();
        // // get the dog name from the input
        // let dogName = dogNameInput.value.trim();
        // // if the dog name is empty, set a default name
        // if (dogName === '') {
        //     dogName = 'Buddy';
        // }
        // // create the dog with the given name
        // createDog(dogName);
        // generate the maze
        generateMaze();
        // log game status
        console.log('Game is running:', !gamePaused);
        // focus on the game container
        gameContainer.focus();
    });

    // listen for spacebar key to pause or resume the game
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            gamePaused = !gamePaused;
            console.log('Game is paused:', gamePaused);
        }
    });

    dog.addEventListener('mouseover', () => {
        // if the game is not paused
        if (!gamePaused) {
            // follow the cursor
            dog.addEventListener('mousemove', (event) => {
                // if the game is not paused
                if (!gamePaused) {
                    dog.style.left = `${event.clientX - dog.offsetWidth / 2}px`;
                    dog.style.top = `${event.clientY - dog.offsetHeight / 2}px`;
                }
            });

            // once every second
            var oneSecondInterval = setInterval(() => {
                // check if the dog is in the shelter
                checkDogInShelter();
                // check if the dog is in the home
                checkDogInHome();
                // check if the dog touches the wall
                checkDogTouchesWall();
            }, 1000);
            
            // // if game paused is true break the interval
            // if (gamePaused === true) {
            //     clearInterval(oneSecondInterval);
            // }
        }
        // else
        // else {
        //     // stay
        //     dog.style.left = `${dog.offsetLeft}px`;
        //     dog.style.top = `${dog.offsetTop}px`;
        // }
    });

    // listen for click events on the reset button
    resetButton.addEventListener('click', () => {
        // refresh the page to reset the game
        location.reload();
    });

});

