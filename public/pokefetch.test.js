// jest.mock("./pokefetch", () => ({
//   ...jest.requireActual("./pokefetch"),
//   //   showResults: jest.fn(),
// }));
const { showResults } = require("./showResults");
const { pokeFetch } = require("./pokefetch");
const fetchMock = require("fetch-mock");
jest.mock("./showResults", () => ({
  showResults: jest.fn((data) => console.log(data)),
}));

// jest.spyOn(showResults, "showResults");
// showResults.showResults.mockImplementation((data) => {
//   console.log("data", data);
//   return data;
// });
// showResultsx.showResults = jest.fn();

describe("pokefetch tests", () => {
  beforeAll(() => {
    fetchMock.restore();
  });
  it("show results should be called", async () => {
    fetchMock.getOnce("begin:/search", {
      status: 200,
      body: "Yamask",
    }); //call pokedexFetch

    await pokeFetch("y");
    await expect(showResults).toHaveBeenCalled();
  });
});
