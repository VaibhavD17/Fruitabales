import { ADD_SUBCATEGORY, DELETE_SUBCATEGORY, EDIT_SUBCATEGORY, GET_SUBCATEGORIES } from "../ActionType";


export const getSubcategories = () => async (dispatch) => {
    try {
        const subResponse = await fetch("http://localhost:8080/subcategory");
        const sData = await subResponse.json();

        dispatch({ type: GET_SUBCATEGORIES, payload: sData })

    } catch (error) {
        console.log(error);
    }
}

export const addSubcategories = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/subcategory", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const Fdata = await response.json();

        dispatch({ type: ADD_SUBCATEGORY, payload: Fdata })
    } catch (error) {
        console.log(error);
    }

}

export const deleteSubcategory = (id) => async (dispatch) => {
    try {
        await fetch("http://localhost:8080/subcategory/" + id, {
            method: "DELETE"
        })

        dispatch({ type: DELETE_SUBCATEGORY, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const updateSubcategory = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/subcategory/" + data.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const Fdata = await response.json();

        dispatch({ type: EDIT_SUBCATEGORY, payload: Fdata })

    } catch (error) {
        console.log(error);
    }
}