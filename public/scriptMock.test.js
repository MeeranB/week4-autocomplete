/**
 * @jest-environment jsdom
 */
//
const testingLib = require("@testing-library/dom");
const fetchMock = require("fetch-mock");
const fs = require("fs");
const path = require("path");
const { showResults } = require("./showResults");
const pokeFetch = require("./pokefetch");

// To add html do the following:
// Suggested from https://dev.to/snowleo208/things-i-learned-after-writing-tests-for-js-and-html-page-4lja
jest.mock("./showResults", () => {
  return {
    showResults: jest.fn((data) => console.log("show result mock is called")),
  };
});

// jest.mock("./pokefetch", () => {
//   return {
//     pokeFetch: jest.fn((data) => console.log("hello")),
//   };
// });
const spy = jest.spyOn(pokeFetch, "pokeFetch");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
document.body.innerHTML = html.toString();

const script = require("./script");

describe("searchPokedex tests", () => {
  beforeAll(() => {
    fetchMock.restore();
  });
  it("should call show result", async () => {
    const pokeinput = document.getElementById("poke-input");
    fetchMock.getOnce("begin:/search", {
      status: 200,
      body: "Yamask",
    });
    // const x = await pokeinput.dispatchEvent(
    //   new KeyboardEvent("keyup", { key: "y" })
    // );

    testingLib.fireEvent.keyUp(pokeinput, { key: "y", code: "Keyy" });
    expect(spy).toHaveBeenCalled();

    await testingLib.waitFor(() => {
      expect(showResults).toHaveBeenCalledTimes(1);
      expect(showResults).toHaveBeenCalledWith("Yamask");
    });
  });
});
