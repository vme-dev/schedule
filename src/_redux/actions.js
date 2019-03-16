export function ADD_EVENT(obj) {
    return {
        type: 'ADD_EVENT',
        obj
    }
};
export function DELETE_EVENT( obj ) {
    return {
        type: 'DELETE_EVENT',
        id: obj.id
    }
};
export function UPDATE_EVENT( id,date) {
    return {
        type: 'UPDATE_EVENT',
        date: date,
        id: id
    }
};
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    console.log(items);
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
}

export function fetchApi(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess([items])))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
}

export function SET_NAME(obj) {
    
    return {
        type: 'SET_NAME',
        name:obj.name
    };
}
export function fetchCreateUser(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((obj) => dispatch(SET_NAME(obj)))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
};


export function fetchAddEvent(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));
                console.log(response);
                return response;
            })
            .then((response) => response.json())
            .then((obj) => dispatch(ADD_EVENT(obj)))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
};

export function GET_EVENT(arr) {
    
    return {
        type: 'GET_EVENT',
        event:arr
    };
}

export function fetchGetEvent(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));
                console.log(response);
                return response;
            })
            .then((response) => response.json())
            .then((arr) => dispatch(GET_EVENT(arr)))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
};

export function fetchDeleteEvent(url,options) {

    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url,options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((obj) => dispatch(DELETE_EVENT(obj)))
            .catch(() => { 
                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(true))});
    };
};