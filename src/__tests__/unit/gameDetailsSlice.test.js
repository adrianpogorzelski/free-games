import gameDetailsReducer, { setCurrentGameId, setGameData } from "../../store/gameDetailsSlice";

describe("gameDetailsSlice", () => {

    // Initial state
    const initialState = {
        id: null,
        data: null
    };

    it("handles setCurrentGameId action", () => {
        const testId = 123; // you can use any id for testing
        const newState = gameDetailsReducer(initialState, setCurrentGameId(testId));
        expect(newState.id).toBe(testId);
    });

    it("handles setGameData action", () => {
        const testData = { title: "Game Title", description: "Game Description" }; // sample data
        const newState = gameDetailsReducer(initialState, setGameData(testData));
        expect(newState.data).toEqual(testData);
    });

});
