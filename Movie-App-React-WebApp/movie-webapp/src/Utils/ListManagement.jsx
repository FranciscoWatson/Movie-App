// utils/listManagement.js

const getListData = () => {
    return JSON.parse(localStorage.getItem('userLists')) || {};
};

const saveListData = (lists) => {
    localStorage.setItem('userLists', JSON.stringify(lists));
};

export const createList = (listName) => {
    const lists = getListData();
    if (!lists[listName]) {
        lists[listName] = [];
        saveListData(lists);
    }
};

export const addMovieToList = (listName, movieId) => {
    const lists = getListData();
    if (lists[listName] && !lists[listName].includes(movieId)) {
        lists[listName].push(movieId);
        saveListData(lists);
    }
};

export const removeMovieFromList = (listName, movieId) => {
    const lists = getListData();
    if (lists[listName]) {
        lists[listName] = lists[listName].filter(id => id !== movieId);
        saveListData(lists);
    }
};

export const deleteList = (listName) => {
    const lists = getListData();
    if (lists[listName]) {
        delete lists[listName];
        saveListData(lists);
    }
};
