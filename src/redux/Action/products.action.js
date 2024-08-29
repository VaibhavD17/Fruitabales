import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS } from "../ActionType";


export const getProduct = () => async (dispatch) => {
    try {
        const productresponse = await fetch("http://localhost:8080/product");
        const Pdata = await productresponse.json();

        dispatch({ type: GET_PRODUCTS, payload: Pdata })

    } catch (error) {
        console.log(error);
    }
}

export const addProduct = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/product", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const Pdata = await response.json();

        dispatch({ type: ADD_PRODUCT, payload: Pdata })

    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await fetch("http://localhost:8080/product/" + id, {
            method: "DELETE"
        })

        dispatch({ type: DELETE_PRODUCT, payload: id })
    } catch (error) {
        console.log(error);
    }

}

export const updateProduct = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/product/" + data.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const Pdata = await response.json();

        dispatch({ type: EDIT_PRODUCT, payload: Pdata })

    } catch (error) {
        console.log(error);
    }
}