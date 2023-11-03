import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredResults, resetFilters } from '../store/filtersSlice';
import fetchData from '../utils/fetchData';

const Filters = () => {
    const dispatch = useDispatch();
    const ONLY_PLATFORM = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const FILTER = 'https://free-to-play-games-database.p.rapidapi.com/api/filter';

    const TAGS_AVAILABLE = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']

    const [tagsSelected, setTagsSelected] = useState([]);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tags = '';
        let params = {};
        let filteredGames;
        if (tagsSelected.length === 0) {
            setErrorMessageVisible(false);
            params = {
                platform: e.target.elements.platform.value,
            };
            filteredGames = await fetchData(ONLY_PLATFORM, params);
        } else {
            for (let i = 0; i < tagsSelected.length; i++) {
                tags += tagsSelected[i];
                tags += '.';
            }
            params = {
                tag: tags,
                platform: e.target.elements.platform.value,
            };
            filteredGames = await fetchData(FILTER, params);
            setErrorMessageVisible(false);
        }
        if (filteredGames.status === 0) {
            filteredGames = null;
            setErrorMessageVisible(true);
        }
        dispatch(setFilteredResults(filteredGames));
    };

    const handleTagSelection = (tag) => {
        if (tagsSelected.includes(tag)) {
            setTagsSelected(tagsSelected.filter((selectedTag) => selectedTag !== tag));
        } else {
            setTagsSelected([...tagsSelected, tag]);
        }
    };

    const handleReset = () => {
        setTagsSelected([]);
        setErrorMessageVisible(false);
        dispatch(resetFilters());
    };
    return (
        <form data-testid='filters' className="mb-3 row-cols-auto" onSubmit={handleSubmit}>
            <div className="row align-items-center">
                <div data-testid="platform" className="col-2">
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

                <div data-testid="genre" className="col-8">
                    {TAGS_AVAILABLE.map((tag) => (
                        <div key={tag} className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={tag}
                                value={tag}
                                checked={tagsSelected.includes(tag)}
                                onChange={() => handleTagSelection(tag)}
                            />
                            <label className="form-check-label" htmlFor={tag}>
                                {tag}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="col-2">
                    <button type="submit" className="btn btn-secondary me-3" data-testid="filter-button">
                        Filter
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>

            <div id="alert" className={`alert alert-danger mt-3 ${errorMessageVisible ? '' : 'd-none'}`} role="alert">
                Could not find any games with the specified criteria
            </div>
        </form>
    );
};

export default Filters;