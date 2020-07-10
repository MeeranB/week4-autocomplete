
function pokedexFetch() {
    fetch("../data/pokedex.txt")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            searchPokedex(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function searchPokedex(input) {
    //logs filtered list for a specific query
    const query = document.getElementById('input').value;
    const splitInput = input.split("\n");
    const output = splitInput.filter((word) => {
        return word.startsWith(query);
    });
    console.log(output.join("\n"));
}

