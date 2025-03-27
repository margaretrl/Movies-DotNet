import React, { useState } from 'react';
import './Header.css';
import addIcon from '../assets/add.svg';
import searchIcon from '../assets/search.svg';
import dominoIcon from '../assets/domino.svg';

function Header({ title, onToggleForm, onSearch, onFlipCards }) {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchVisible((prev) => !prev);
    };

    return (
        <header className="fixed-top">
            <h1>{title}</h1>
            <div className="header-actions">
                {/* Search Bar with Animation */}
                <input
                    type="text"
                    className={`search-bar ${isSearchVisible ? 'visible' : ''}`}
                    placeholder="Search by title..."
                    onChange={(e) => onSearch(e.target.value)}
                />

                {/* Search Icon */}
                <img
                    src={searchIcon}
                    alt="Search"
                    className="icon"
                    onClick={toggleSearchBar}
                    title="Search"
                    style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        marginRight: '10px',
                        filter: 'invert(1)',
                    }}
                />

                {/* Flip Cards Icon */}
                <img
                    src={dominoIcon}
                    alt="Flip Cards"
                    onClick={onFlipCards}
                    className="icon"
                    style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        marginRight: '10px',
                    }}
                />

                {/* Add Movie Icon */}
                <img
                    src={addIcon}
                    alt="Add"
                    className="icon"
                    onClick={onToggleForm}
                    title="Add New Movie"
                    style={{
                        cursor: 'pointer',
                        width: '38px',
                        height: '38px',
                        filter: 'invert(1)',
                        marginRight: '40px',
                    }}
                />
            </div>
        </header>
    );
}

export default Header;
