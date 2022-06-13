const Reducer = (state, action) =>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching: true,
                error:false,
            };


        case "LOGIN_SUCCESS":
            return{
                user:action.package,
                isFetching: false,
                error:false,
            };


        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching: false,
                error:action.package,
            };


        case "LOGOUT":
            return{
                user:null,
                isFetching: false,
                error:action.package,
            };


        default: 
            return state;
    }

}

export default Reducer;