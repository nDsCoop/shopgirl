import React, { Component } from 'react'
import Fade  from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';
import Modal from 'react-modal';
import PaypalButton from './PaypalButton';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false};
    }
    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItems : this.props.cartItems,
            total: this.props.cartItems.reduce((a,c) => a + c.price*c.count, 0),
        };
        this.props.createOrder(order);
    };
    closeModal = () => {
        this.props.clearOrder();
    }
    render() {
        const {cartItems, order} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                        <div className="cart cart-header">Cart is empty</div>
                    ) : (
                        <>
                        <div className="cart cart-header">
                            You have {cartItems.length} item in the cart{" "}
                        </div>
                        {order && <Modal
                        isOpen true
                        >
                                <Zoom>
                                    <button className="close-modal" onClick={this.closeModal}>x</button>
                                    <div className="order-details">
                                        <h3 className="success-message">Your order has been placed</h3>
                                        <h2>Code-Order {order._id}</h2>
                                        <ul>
                                            <li>
                                                <div>Name:</div>
                                                <div>{order.name}</div>
                                            </li>
                                            <li>
                                                <div>Email:</div>
                                                <div>{order.email}</div>
                                            </li>
                                            <li>
                                                <div>Date:</div>
                                                <div>{order.date}</div>
                                            </li>
                                            <li>
                                                <div>Address:</div>
                                                <div>{order.address}</div>
                                            </li>
                                            <li>
                                                <div>Cart Items:</div>
                                                <div>
                                                { order.cartItems.map((x) => (
                                                        <div>
                                                            {x.count} {" x "} {x.title}
                                                        </div>      
                                                ))}
                                                </div>
                                            </li>
                                            <li>
                                                <div>Total:</div>
                                                <div>${ " " }{order.total}</div>
                                            </li>
                                           <li>
                                                <PaypalButton total={order.total} />
                                           </li>
                                        </ul>
                                    </div>
                                </Zoom>
                            </Modal>
                        }
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {this.props.cartItems.map(item =>(
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        {(item.price)}$ x {(item.count)}{" "}
                                        <div className="right">
                                            <button onClick={() => this.props.removeFromCart(item)} >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                <div className="cart">
                    <div className="total">
                        <div>
                           Total:{" "} ${cartItems.reduce((a, c) => a + c.price*c.count, 0)}
                        </div>
                        <button onClick={() => {this.setState({ showCheckout: true}) }} className="button primary">Proceed</button>
                    </div>
                </div>
                </>
                  )
                }
                {this.state.showCheckout && (
                    <Fade right cascade>
                        <div className="cart">
                            <div className="form">
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </Fade>
                )}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
}),{
    removeFromCart,
    createOrder,
    clearOrder
})(Cart);