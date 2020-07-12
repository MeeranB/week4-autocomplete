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
 - Following our example of the `/search/p` request the query variable is evaluated as follows:
    - `request.url` is evaluated as the string `"/search/p"`
    - This string is then passed through the [split string method](https://www.w3schools.com/jsref/jsref_split.asp)
    - This splits the string into the following array `[ "" , "search", "p" ]`
    - We then take the 2nd index `"p"` and assign it to our query variable
    
 - We then begin building our response object by setting the `content-type` header to `index.html`
    
3. `fs.readFile` read the contents of a file of the file path.

  - The file path read in at this point is our locally stored `pokedex.text` file
  - The second parameter in the `readFile` method is a function which is called once the text file has been parsed
  - The `readFile` method creates the constant `file` which is call-able within our callback function here
  
4. The first `if` statement deals with any error caused by an invalid file path being read

```javascript
  fs.readFile(__dirname + "/../../data/pokedex.txt", function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
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

- This is the point at which we define the response body to be sent back with our "p" query
- The processed string that we set the response body to is created by our function call to the searchPokedex function
- The parameters we pass in this case are:
   - `searchList` which is the `pokedex.txt` file that was read and subsequently converted to a buffer and back into a string
   -  The `query` which refers to the string "p" following our example
   
7. The searchPokedex function
 
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

- This function defines how to take the input (`pokedex.txt`) and the query (`"p"`) and return the expected output as a string to be used as a response body
- We first [split](https://www.w3schools.com/jsref/jsref_split.asp) the `pokedex.txt` file into an array where each index represents each pokemon
- We then [filter](https://www.w3schools.com/jsref/jsref_filter.asp) this array to remove results we do not want in our output array
   - The filter callback takes each index value (`pokemon`) and if returns true, will NOT remove the index from the array
   - The `if (!query) return false` guard clause will remove the entire array if the query is empty or evaluates to false.
      - Note that if there are values in our pokedex.txt that evaluate to false, they will not be dealt with correctly here, as they would be removed from the output despite a query match
   - `testQuery` and `testPokemon` variables are then created as lowercase versions of the respective variables, this is so that we can do a case insensitive search of our input, if we were not to do this, our query "p" would not match any input that started with the character "P" as "Pikachu".startsWith("p") would return false, subsequently removing a valid input index from our output array. Setting all the characters in both strings to lowercase remedies this issue.
- Our searchPokedex function returns a string at this point, which is our filtered input array joined with newlines as delimiters, this is the same format as the expected input string parameter
