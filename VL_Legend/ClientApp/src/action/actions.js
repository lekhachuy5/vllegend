import api from "./api"
export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_ID: 'FETCH_ID'
}
const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0),
})

export const fecthall = (url) => dispatch => {
    //get api
    api.cus(url).fetchAll()
        .then(
            response => {
                console.log(response)
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        )
        .catch(err => console.log(err))

}

export const fecthbyid = (url,id) => dispatch => {
    //get api
    api.cus(url).fetchById(id)
        .then(
            response => {
                console.log(response)
                dispatch({
                    type: ACTION_TYPES.FETCH_ID,
                    payload: response.data
                })
            }
        )
        .catch(err => console.log(err))

}

export const create = (url,data) => dispatch => {
    data = formateData(data)
    api.cus(url).create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            // onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (url,id, data) => dispatch => {
    data = formateData(data)
    api.cus(url).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            // onSuccess()
        }
        )
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.cus().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        }
        )
        .catch(err => console.log(err))
}