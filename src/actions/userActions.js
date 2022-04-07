import { 
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
    GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_FAIL
} from '../constants/userConstants';

const BASE_URL = 'https:/reqres.in/';

// Load list of all users
export const getAllUsers = (pageNo) => async (dispatch) => {
    try{
        dispatch({type : GET_USERS_REQUEST})
        const response = await fetch(`${ BASE_URL }api/users?page=${pageNo}`);
        const data = await response.json();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error
        })
    }
}


// Load single user by ID
export const getSingleUser = (userId) => async (dispatch) => {
    try{
        dispatch({type : GET_SINGLE_USER_REQUEST})
        const response = await fetch(`${ BASE_URL }api/users/${userId}`);
        const data = await response.json();
        dispatch({
            type: GET_SINGLE_USER_SUCCESS,
            payload: data.data
        })
    }catch(error) {
        dispatch({
            type: GET_SINGLE_USER_FAIL,
            payload: error
        })
    }
}