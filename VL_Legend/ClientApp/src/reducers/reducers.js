import { ADD, EDIT, UPDATE, DELETE } from '../constant/actionsTypes';

const postReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                {
                    id: (state.length === 0) ? 0 : state[0].id + 1,
                    name: action.name,
                    descriptions: action.descriptions,
                    editing: false
                },
                ...state
            ];

        case DELETE:
            return state.filter((post) => post.id !== action.id);

        case EDIT:
            return state.map((post) => post.id === action.id
                ? { ...post, editing: !post.editing }
                : post);

        case UPDATE:
            return state.map((post) => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        name: action.newName,
                        descriptions: action.newDescriptions,
                        editing: !post.editing
                    }
                } else {
                    return post;
                }
            });
            
        default: 
            return state;
    }
}

export default postReducer;