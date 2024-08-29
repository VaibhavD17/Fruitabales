import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionType"



export const Increment = () => (dispach) => {
    dispach({type:INCREMENT_COUNTER})
}

export const Decrement = () => (dispach) => {
    dispach({type:DECREMENT_COUNTER})
}