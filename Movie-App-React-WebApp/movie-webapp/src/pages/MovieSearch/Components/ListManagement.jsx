import React, { useState } from 'react';
import { createList } from '../../../Utils/ListManagement';

const ListManager = () => {
    const [listName, setListName] = useState('');

    const handleCreateList = () => {
        if (listName) {
            createList(listName);
            setListName('');  // Reset input field after creating the list
            alert(`List '${listName}' created successfully!`);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={listName}
                onChange={e => setListName(e.target.value)}
                placeholder="Enter new list name"
            />
            <button onClick={handleCreateList}>Create List</button>
        </div>
    );
};

export default ListManager;
