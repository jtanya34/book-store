const Reducer = (state = {email:null} , action) => {

    switch(action.type){
       
        case 'LOGIN':
            let newState = {...state};
            newState.email = action.val.result;
            return newState;
        case 'REGISTER':
            let newAddedState = {...state};
            newAddedState.email = action.val.result;
            return newAddedState
        case 'GETBOOKS':
             console.log("GETBOOKS",action.val.data)
             return action.val.data;
        case 'BUYBOOK':
             console.log('BUYBOOK',state,action.val.data)
            return [action.val.data];
        case 'ADDBOOK':
        return [action.val.data];
        default :
             return state;
    }
};
export default Reducer;
