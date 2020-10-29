import React from "react";

const Search = ({ handleInputChange, searchTerm, handleSubmit }) => {
    return (
        <div className="header input-group mb-3">
            <input 
                className="form-control" 
                placeholder="Search our historic events ..." 
                name="searchTerm" 
                value={searchTerm}
                onChange={(e) => {
                    handleInputChange(e)
                }}
                />
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-secondary" 
                    type="submit"
                    onClick={() => {
                        handleSubmit(searchTerm)
                    }}
                >Search</button>
            </div>
        </div>
    );
};

export default Search;