import React from 'react';
import './styles.css';

const allFilters = [
    ['Discount Percentage', 'is', '10'],
    ['Discount Percentage', '>', '10'],
    ['Discount Percentage', '<', '10'],
    ['tags', 'contains', 'onScale'],
    ['imageList', 'is empty']
];

const FilterModal = ({ isOpen, onClose, setFilters, filters }) => {
    if (!isOpen) {
        return null;
    }

    function addFilter(index) {
        for (let i=0; i<length; i++) {
            if (filters[i] == allFilters[index]) {
                return;
            }
        }
        filters.push(allFilters[index]);
        setFilters(filters);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">&times;</button>
                <h2>All Filters: </h2>
                <ol>
                    {allFilters.map((filter, index) => (
                        <li key={index} className="mb-2">
                            {index + 1}&nbsp;&nbsp;
                            <button onClick={() => addFilter(index)} className="button">
                                {filter.map((value, id) => (
                                    <span key={id}>{value}&nbsp;</span>
                                ))}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default FilterModal;
