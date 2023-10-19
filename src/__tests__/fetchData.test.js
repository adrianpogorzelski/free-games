import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import fetchData, {errorMessage} from "../utils/fetchData";
jest.mock('axios');
import axios from "axios";

const mockData = [
    { id: 1, title: 'Game A', thumbnail: '', genre: '' },
    { id: 2, title: 'Game B', thumbnail: '', genre: '' },
];

describe("Fetching data", () => {
    it("gets data as an array", async () => {
        axios.get.mockResolvedValue({data: mockData});
        const data = await fetchData()
        expect(data).toHaveLength(2);
        expect(data).toBeInstanceOf(Array)
    })
    it("catches errors", async () => {
        axios.get.mockRejectedValue(new Error(errorMessage));
        await expect(fetchData()).rejects.toThrow("Cannot resolve API data")
    })
})