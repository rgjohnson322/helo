import axios from "axios";

const initialState = {
    user_id: null,
    username: "",
    profile_pic: ""
};

const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const UPDATE_USER = "UPDATE_USER"

export function getSession() {
    return {
        type: GET_SESSION,
        payload: axios.get('/auth/user')
    };
}

export function updateUser(profile_pic) {
    return {
        type: UPDATE_USER,
        payload: axios.put('/auth/profilepic', profile_pic)
    }
}

export function registerUser(newUser) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', newUser)
    };
}

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', user)
    };
}

export function logoutUser() {
    axios.post('/auth/logout');
    return {
        type: LOGOUT_USER
    };
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_SESSION}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                username: payload.data.username,
                profile_pic: payload.data.profile_pic
            };
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                user_id: payload.data.user_id,
                username: payload.data.username,
                profile_pic: payload.data.profile_pic
            };
        case `${LOGIN_USER}_FULFILLED`:
            console.log(payload.data)
            return {
                ...state,
                user_id: payload.data.user_id,
                username: payload.data.username,
                profile_pic: payload.data.profile_pic
            };
        case LOGOUT_USER:
            return {
                user_id: null,
                username: '',
                profile_pic: ''
            };
            case `${UPDATE_USER}_FULFILLED`:
                return {
                    profile_pic: payload.data.profile_pic
                }
        default:
            return state;
    }
}