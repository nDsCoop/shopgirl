import React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from "react-redux";
// import logo from './logo.svg';
// import './App.css';

class App extends React.Component {
  constructor (){
    super();
    this.state = {

      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

    };
  }
 
  // addToCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach((item) => {
  //     if (item._id === product._id) {
  //       item.count++;
  //       alreadyInCart = true;
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 });
  //   }
  //   this.setState({ cartItems });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // };

  // removeFromCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   this.setState({
  //     cartItems: cartItems.filter(x => x._id !==  product._id),
  //   });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !==  product._id)));
  // };

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  render () {
    return (
      <Provider store= {store} >
      <div className="grid-container">
        <header>
            <a href="/">
              nDs Shopping
            </a>
        </header>
        <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products />
              </div>
              <div className="sidebar">
                <Cart />
              </div> 
            </div> 
        </main>
        <footer>
          All right is nDs
        </footer>
      </div>
      </Provider>
    );
  }
 
}

export default App;