import * as types from '../constant/actionsTypes';

export const addPost = (name, descriptions) => ({
    type: types.ADD,
    name,
    descriptions
});

export const editPost = (id) => ({
    type: types.EDIT,
    id
});

export const updatePost = (id, newName, newDescriptions) => ({
    type: types.UPDATE,
    id,
    newName,
    newDescriptions
});

export const deletePost = (id) => ({
    type: types.DELETE,
    id: id
});