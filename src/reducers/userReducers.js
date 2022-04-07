import { 
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
    GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_FAIL
} from '../constants/userConstants';

export const getUsersReducer = (state = { users: {} }, action) =>{
    switch(action.type){
        case GET_USERS_REQUEST:
            return{
                ...state,
                usersLoading: true,
                usersError: null
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                usersLoading: false,
                users: action.payload
            }
        case GET_USERS_FAIL:
            return{
                ...state,
                usersLoading: false,
                usersError: action.payload
            }
        default:
            return state
    }
}

export const getSingleUserReducer = (state = { singleUser: {} }, action) =>{
    switch(action.type){
        case GET_SINGLE_USER_REQUEST:
            return{
                ...state,
                singleUserLoading: true,
                singleUserError: null
            }
        case GET_SINGLE_USER_SUCCESS:
            return{
                ...state,
                singleUserLoading: false,
                singleUser: action.payload
            }
        case GET_SINGLE_USER_FAIL:
            return{
                ...state,
                singleUserLoading: false,
                singleUserError: action.payload
            }
        default:
            return state
    }
}