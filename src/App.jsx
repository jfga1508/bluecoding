// @ts-nocheck
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from './store/cartSlide';
import { clientsAction } from './store/clientsSlide';
import { useEffect } from 'react';

function App() {
    const cartItems = useSelector((state) => state.cart);
    const clients = useSelector((state) => state.clients);
    const dispatch = useDispatch();

    const addItem = () => {
        dispatch(
            cartActions.addItem({
                name: 'Peer',
            })
        );
        dispatch(
            clientsAction.addItem({
                name: 'Jean',
            })
        );
    };

    useEffect(() => {
        console.log(cartItems, clients);

        return () => {};
    }, [cartItems, clients]);

    return (
        <>
            <h1>Vite + React</h1>
            <div className='card'>
                <button className='btn btn-primary' onClick={() => addItem()}>
                    Add
                </button>
                {clients.items &&
                    clients.items.map((client, index) => (
                        <p key={index}>{client.name}</p>
                    ))}
                <hr></hr>
                {cartItems.items.map((item, index) => (
                    <p key={index}>{item.name}</p>
                ))}
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
