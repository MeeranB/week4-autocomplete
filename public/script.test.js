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

document.documentElement.innerHTML = html.toString();

jest.mock("./script", () =>
  Object.assign({}, jest.requireActual("./script"), {
    showResults: jest.fn(),
  })
);
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
    // const results = document.getElementById("output");
    // await testingLib.waitFor(() => expect(results.innerHTML).toBe("Yamask"));
    // script.showResults = jest.fn();
    // const spy = jest.spyOn(script, "showResults");
    // expect(spy).toHaveBeenCalled();

    expect(script.showResults).toHaveBeenCalled();
  });
});

// const script = require("./script");

// describe("searchPokedex tests", () => {
//   beforeAll(() => {
//     fetchMock.restore();
//   });
//   it("should take in string", async () => {
//     const pokeinput = document.getElementById("poke-input");
//     fetchMock.getOnce("begin:/search", {
//       status: 200,
//       body: "Yamask",
//     }); //call pokedexFetch

//     await pokeinput.dispatchEvent(new KeyboardEvent("keyup", { key: "y" }));
//     const results = document.getElementById("output");
//     await testingLib.waitFor(() => expect(results.innerHTML).toBe("Yamask"));
//   });
// });
