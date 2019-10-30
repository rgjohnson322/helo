import axios from "axios";

const initialState = {
    posts: []
};

const GET_POSTS = "GET_POSTS";
const GET_POST_BY_TITLE = "GET_POST_BY_TITLE"


export function getAllPosts() {
    console.log("hit")
    return {
    type: GET_POSTS,
    payload: axios.get(`/api/posts`)
    };
}

export function getPostByTitle(searchTitle) {
    return {
        type: GET_POST_BY_TITLE,
        payload: axios.get(`/api/posts/title?title=${searchTitle}`)
    };
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_POSTS}_FULFILLED`:
            console.log(payload)
            return {
                ...state,
                posts: payload.data
            };
        case `${GET_POST_BY_TITLE}_FULFILLED`:
            return{
                ...state,
                posts: payload.data
            };
        default:
            return state;
    }
}