const supertest = require("supertest");
const script = require("../public/script");
const fetchMock = require("fetch-mock");

test("1 is 1", () => {
  let actual = 1;
  let expected = 1;
  expect(actual).toBe(expected);
});

describe("searchPokedex tests", () => {
  beforeAll(() => {
    fetchMock.restore();
  });
  it("should take in string", () => {
    fetchMock.getOnce("../data/pokedex.txt"); //call pokedexFetch
    //check typeof response.txt of mocked call
    //script.pokedexFetch().expect(response.text()).toBeType("string");
  });
});
