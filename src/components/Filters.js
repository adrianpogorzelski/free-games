import React from 'react';
import { useDispatch } from 'react-redux';
import {setFilteredResults, resetFilters} from "../store/filtersSlice";
import fetchData from "../utils/fetchData";

const Filters = () => {
    const dispatch = useDispatch();
    const ENDPOINT = 'https://free-to-play-games-database.p.rapidapi.com/api/games'

    const handleSubmit = async (e) => {
        e.preventDefault();
        let params = {}
        params.platform = e.target.elements.platform.value;
        const filteredGames = await fetchData(ENDPOINT, params);
        dispatch(setFilteredResults(filteredGames));
    };

    return (
        <form data-testid='filters' className="mb-3 row-cols-auto" onSubmit={handleSubmit}>
            <div className="row">
                <div data-testid="platform" className="col">
                    <div className='form-check'>
                        <input className="form-check-input" type="radio" name="platform" id="all" value="all" defaultChecked />
                        <label className="form-check-label" htmlFor="all">All platforms</label>
                    </div>
                    <div className='form-check'>
                        <input className="form-check-input" type="radio" name="platform" id="pc" value="pc"/>
                        <label className="form-check-label" htmlFor="pc">PC</label>
                    </div>
                    <div className='form-check'>
                        <input className="form-check-input" type="radio" name="platform" id="browser" value="browser"/>
                        <label className="form-check-label" htmlFor="browser">Browser</label>
                    </div>
                </div>

                <div data-testid="genre" className="col">

                </div>

                <div className="col">
                    <button type="submit" className="btn btn-secondary me-3">Filter</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(resetFilters())}>Reset</button>
                </div>
            </div>
        </form>
    )
}

export default Filters;