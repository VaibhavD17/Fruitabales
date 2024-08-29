import { json } from "react-router-dom";
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORIES } from "../ActionType";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/category")
        const data = await response.json();

        dispatch({ type: GET_CATEGORIES, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const addCategories = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/category", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const cdata = await response.json();

        dispatch({ type: ADD_CATEGORY, payload: cdata })

    } catch (error) {
        console.log(error);
    }
}

export const deleteCategories = (id) => async (dispatch) => {
    try {
        await fetch("http://localhost:8080/category/" + id, {
            method: "DELETE"
        });

        dispatch({ type: DELETE_CATEGORY, payload: id })

    } catch (error) {
        console.log(error);
    }

}

export const updateCategories = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/category/" + data.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const Fdata = await response.json();

        dispatch({ type: EDIT_CATEGORY, payload: Fdata })
    } catch (error) {
        console.log(error);
    }
}
