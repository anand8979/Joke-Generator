document.getElementById('get-joke').addEventListener('click', fetchJoke);
document.getElementById('clear-joke').addEventListener('click', clearJoke);

async function fetchJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        if (!response.ok) {
            throw new Error('Failed to fetch the joke.');
        }
        const data = await response.json();

        let jokeText;
        if (data.type === 'single') {
            jokeText = data.joke;
        } else {
            jokeText = `${data.setup} ${data.delivery}`;
        }

        displayJoke(jokeText);
    } catch (error) {
        displayJoke("Oops! Couldn't fetch a joke. Please try again.");
        console.error(error); // Logs the actual error for debugging
    }
}

function displayJoke(joke) {
    const jokeElement = document.getElementById('joke');
    jokeElement.textContent = joke;

    const charCount = joke.length;
    document.getElementById('char-count').textContent = `Character count: ${charCount}`;
}

function clearJoke() {
    document.getElementById('joke').textContent = "Press the button for a joke!";
    document.getElementById('char-count').textContent = "Character count: 0";
}
