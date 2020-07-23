const { pokeFetch } = require("./pokefetch");
const fetchMock = require("fetch-mock");

const showResultsx = require("./showResults");
jest.spyOn(showResultsx, "showResults");
showResultsx.showResults.mockImplementation((data) => {
  console.log("data", data);
  return `${data} returned`;
});
// If just checking if the mock is called can use jest.fn() like below
// showResultsx.showResults = jest.fn();

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
    expect(showResultsx.showResults).toHaveBeenCalled();
    expect(showResultsx.showResults).toHaveBeenCalledWith("Yamask");
    expect(showResultsx.showResults).toHaveReturnedWith("Yamask returned");
  });
});
