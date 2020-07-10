function pokedexFetch() {
    fetch("../data/pokedex.txt")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            searchPokedex(data);
            //raw text file is logged here
        });
}

function searchPokedex(input) {
    const query = document.getElementById('input').value;
    //Returns filtered list for a specific query
    const splitInput = input.split("\n");
    const output = splitInput.filter((word) => {
        return word.startsWith(query);
    });
    console.log(output.join("\n"));
}
