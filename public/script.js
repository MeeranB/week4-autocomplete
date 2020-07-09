console.log("test");

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        fetch("../data/pokedex.txt")
            .then(response => {
                return response.text()})
            .then((data) => {;
                searchPokedex(data)
                //raw text file is logged here
            })
    }
}

function searchPokedex (input, query = "A") {
    //Uses string methods to search pokedex.txt to filter the list of pokemon
    const splitInput = input.split("\n");
    const Output = splitInput.filter((word) => {
        //words first letter is not query
        return !word.startsWith(query)
    })
    console.log(Output.join("\n"))
}