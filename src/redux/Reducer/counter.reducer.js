import React from 'react';
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from '../ActionType';

const initialState = {
    count: 0
}

export function counterReducer(state = initialState, action) {

    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                count: state.count + 1
            }
        case DECREMENT_COUNTER:
            return {
                count: state.count - 1
            }
        default:
            return state;

    }

    return (
        <div>

        </div>
    );
}

export default counterReducer;