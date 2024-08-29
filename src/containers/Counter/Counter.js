import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/Slice/Counter.slice';

function Counter(props) {
    const dispatch = useDispatch()

    const counter = useSelector(state => state.counter)

    const hendleInc = () => {
        dispatch(increment())
    }

    const hendleDec = () => {
        dispatch(decrement())
    }
    return (
        <div><br/><br/><br/><br/><br/><br/><br/>
            <button className='mx-3 btn btn-dark' onClick={hendleInc}>+</button>
            <span className='h4'>{counter.count}</span>
            <button className='mx-3 btn btn-dark' onClick={hendleDec}>-</button>
        </div>
    );
}

export default Counter;