## script.js

1. Access the input field. On `keyup` send a get request to the `/search/${input.value}`

> `input.value` returns the value a user types in the input field.

- Let us assume that the current input value is the string "p"
- This get-request is handled by the router, which accesses the url property of our request object, which in this case is `/search/p`
- The router function then compares the url to the if-conditionals, running the blocks where true statements are parsed
- In this case, the only statement that is true is the `url.startsWith("/search")`
- This code block calls our searchHandler function with the request object (that has the request url of `/search/p`

2. The first `.then` reads the response and return as text, the second `.then` takes the data and passes it to the `showResults` function.

3. The `catch()` method deals with the unsuccessul cases.

```javascript
input.addEventListener("keyup", () => {
  fetch(`/search/${input.value}`)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      showResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
```

4. The `showResults` function produces the Pokémon results while the user has the use types in their query
5. The `showResults` function takes in the parameter `searchOuput` which is used in an `if/else` statement.
6. The first `if` statement assesses if the search does not exist by setting the `.length` to 0 then it will output a text error message
7. The `else` statement outputs the users query if it matches the Pokémon in the `pokedex.txt` file

```javascript
function showResults(searchOutput) {
  const results = document.getElementById("output");
  if (searchOutput.length == 0) {
    results.innerText = "No Results Found";
  } else {
    results.innerHTML = searchOutput;
  }
}
```

## search.js handler

1. The search handler will be passed two arguments as objects: incoming request, and incoming response that will eventually be sent.

```javascript
function searchHandler(request, response) {}
```

2. The query variable takes the url and splits it at the second index ([USER_INPUT])
   > http://localhost:3000/search/[USER_INPUT]

```javascript
const query = request.url.split("/")[2];
```

3. `fs.readFile` read the contents of a file of the file path.
4. The first `if` statement deals with any errors with the file system

```javascript
  fs.readFile(__dirname + "/../../data/pokedex.txt", function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
    } else {
      const searchList = file.toString();
      //console.log(searchList);
      response.end(searchPokedex(searchList, query));
    }
  });
}
```

5. The `else` statement deals with the file returned. The file currently looks like a chunk of memory `<Buffer 53 6f...>`
   \n
   In order to make the file usable we can convert it back into a string using the `.toString` method

```javascript
const searchList = file.toString();
```

6. response.end()

```javascript
response.end(searchPokedex(searchList, query));
```

```javascript
function searchPokedex(input, query) {
  const splitInput = input.split("\n");
  const output = splitInput.filter((pokemon) => {
    //if case insensitive query matches current search list index, return true
    if (!query) return false;
    const testQuery = query.toLowerCase();
    const testPokemon = pokemon.toLowerCase();
    return testPokemon.startsWith(testQuery);
  });
  return output.join("\n");
}
```
