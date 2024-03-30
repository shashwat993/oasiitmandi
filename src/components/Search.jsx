import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useStudentContext } from '@/context/studentContext';

const Search = () => {
    const { searchPost, students } = useStudentContext();

    const handleChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();

        // Filter students based on the search query
        searchPost(searchQuery);

        // If search query is empty, reset to original unfiltered student list
        if (searchQuery === '') {
            searchPost('');
        }
    };

    return (
        <div>
            <InputText placeholder="Search Anything" className="my-3" onChange={handleChange} />
        </div>
    );
};

export default Search;
