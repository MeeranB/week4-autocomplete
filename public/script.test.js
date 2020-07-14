/**
 * @jest-environment jsdom
 */
//
const supertest = require("supertest");
const testingLib = require("@testing-library/dom");
const fetchMock = require("fetch-mock");
const fs = require("fs");
const path = require("path");
// To add html do the following:
// Suggested from https://dev.to/snowleo208/things-i-learned-after-writing-tests-for-js-and-html-page-4lja
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

document.body.innerHTML = html.toString();
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <title>Pokedex</title>
//     <!-- <link rel="icon" href="/favicon.ico"> -->
//     <link rel="stylesheet" href="main.css" />
//     <meta name="description" content="Pokedex" />
//   </head>
//   <body>
//     <h1>Shivani and Meerans Pokedex!</h1>
//     <section>
//       <div class="entry-container">
//         <div class="search-box">
//           <form class="" action="" method="" id="the-form">
//             <h2>Search for your pokemon</h2>
//             <div class="input-box">
//               <input type="text" id="poke-input" required="" autofocus />
//               <label for="poke-input">Enter Pokemon Here</label>
//             </div>
//           </form>
//           <div id="output"></div>
//         </div>
//       </div>
//     </section>
//   </body>
// </html>
// `;

// jest.mock("./script", () => ({
//   ...jest.requireActual("./script"),
//   showResults: jest.fn(),
// }));

// jest.mock("./showResults");
// import * as results from "./showResults";
// showResults;
// import script from "./script";

// describe("searchPokedex tests", () => {
//   beforeAll(() => {
//     fetchMock.restore();
//   });
//   beforeEach(() => {
//     jest.clearAllMocks();

//     jest.resetModules();
//   });
//   const spy = jest.spyOn(results, "showResults");
//   results.showResults.mockImplementation(jest.fn());
//   require("./script");
//   it("should take in string", async () => {
//     const pokeinput = document.getElementById("poke-input");
//     fetchMock.getOnce("begin:/search", {
//       status: 200,
//       body: "Yamask",
//     }); //call pokedexFetch

//     await pokeinput.dispatchEvent(
//       new KeyboardEvent("keyup", {
//         key: "y",
//       })
//     );

//     // const results = document.getElementById("output");
//     // await testingLib.waitFor(() => expect(results.innerHTML).toBe("Yamask"));
//     expect(spy).toHaveBeenCalled();

//     // expect(spy).toHaveBeenCalled();
//     // await testingLib.waitFor(() => expect(results.innerHTML).toBe("Yamask"));
//     // await testingLib.waitFor(() => expect(spy).toHaveBeenCalled());
//   });
// });

const script = require("./script");

describe("searchPokedex tests", () => {
  beforeAll(() => {
    fetchMock.restore();
  });
  it("should take in string", async () => {
    const pokeinput = document.getElementById("poke-input");
    fetchMock.getOnce("begin:/search", {
      status: 200,
      body: "Yamask",
    }); //call pokedexFetch

    await pokeinput.dispatchEvent(new KeyboardEvent("keyup", { key: "y" }));
    const results = document.getElementById("output");
    await testingLib.waitFor(() => expect(results.innerHTML).toBe("Yamask"));
  });
});
