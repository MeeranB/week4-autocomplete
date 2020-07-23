const { showResults } = require("./showResults");
const { pokeFetch } = require("./pokefetch");
const fetchMock = require("fetch-mock");

// this mocks the whole file. You need to mock all the fucntions you need this way

jest.mock("./showResults", () => ({
  // Use the following line to add all the other functions you do not wish to change in the file and just overwrite the functions you want to mock
  // ...jest.requireActual("./showResults"),
  showResults: jest.fn((data) => data),
}));

describe("pokefetch tests", () => {
  beforeAll(() => {
    fetchMock.restore();
  });
  it("show results should be called", async () => {
    fetchMock.getOnce("begin:/search", {
      status: 200,
      body: "Yamask",
    });

    await pokeFetch("y");
    expect(showResults).toHaveBeenCalled();
    expect(showResults).toHaveBeenCalledWith("Yamask");
  });
});
