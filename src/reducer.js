export const initialState={
    user:null,
    playlists:[],
    playing:false,
    item:null,
    //change token to null after developing
    token:null,
    //token:'BQDtFUEblpN7VVzJiy4ZV0m2mc6YUoaRB5BMnxpj96iAgsjf1JnQzdtYPuwQQdOSD5yAiqplErAvy6QF4_ks9fqIadXFTIbIuS-cM5LhRdocE2-w07OAI3bLChziGlHRtYb8KLGrBw2BMmPCUWeTAI4CDdrXLDLukjcSo4g5W3KCiDhZ41NRWm9cyuihLiWAZAzyc1iPayrguCFIOwwz',
};

const reducer=(state,action)=>{
    console.log(action)

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user:action.user,
            };

        case "SET_TOKEN":
            return {
                ...state,
                token:action.token,
            };

        case "SET_PLAYLISTS":
            return{
                ...state,
                playlists:action.playlists,
            };

        case "SET_DISCOVER_WEEKLY":
            return{
                ...state,
                discover_weekly:action.discover_weekly,
            };

        case "SET_ITEM":
            return{
                ...state,
                item:action.item,
            }

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };

        default:
            return state;
    }
};

export default reducer;