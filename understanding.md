## script.js

1. Access the input field. On `keyup` send a get request to the `/search/${input.value}`

> `input.value` returns the value a user types in the input field.

2. The first `.then` reads the response and return as text, the second `.then` takes the data and passes it to the `showResults` function.

3. The `catch()` method deals with the unsuccessul cases.

```javascript
const searchField = document.getElementById(input);
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
