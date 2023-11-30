const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}
export default AppReducer;