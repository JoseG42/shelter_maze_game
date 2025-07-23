// JavaScript code for the Waggin' Tails Maze Game
// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // constants for the game elements
    // start button
    const startButton = document.getElementById('start-game');
    // game container
    const gameContainer = document.getElementById('game-container');
    // title card
    const titleCard = document.querySelector('.title-card');
    // dog name input
    const dogNameInput = document.getElementById('dog-name');

    // variables for the game elements
    // game status
    let gameRunning = false;

    

    // function to start the game
    function startGame() {
        // change game status
        gameRunning = true;
        // hide the title card
        titleCard.style.display = 'none';
        // Initialize game elements here
        console.log('Game started!');
    }

    // function to make the dog
    function createDog(name) {
        // create a new div element for the dog
        const dog = document.createElement('div');
        dog.classList.add('dog');
        dog.textContent = name;
        gameContainer.appendChild(dog);
    }

    // function to make a wall at a specific position
    function createWall(fromY, fromX, toY, toX) {
        // create a new div element for the wall
        const wall = document.createElement('div');
        wall.classList.add('wall');
        wall.style.gridArea = `${fromY} / ${fromX} / ${toY} / ${toX}`;
        gameContainer.appendChild(wall);
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

    // listen for click events on the start button
    startButton.addEventListener('click', () => {
        // start the game
        startGame();
        // get the dog name from the input
        let dogName = dogNameInput.value.trim();
        // if the dog name is empty, set a default name
        if (dogName === '') {
            dogName = 'Buddy';
        }
        // create the dog with the given name
        createDog(dogName);
        // generate the maze
        generateMaze();
        // log game status
        console.log('Game is running:', gameRunning);
        // focus on the game container
        gameContainer.focus();
    });

    

});

