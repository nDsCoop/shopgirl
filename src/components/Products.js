import React, { Component } from 'react'
import Modal from 'react-modal';
import  Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null,
        };
    }
    componentDidMount() {
        this.props.fetchProducts();
     }
    openModal = (product) => {
        this.setState ({ product });
    };
    closeModal = () => {
        this.setState({ product: null});
    };
    render() {
        const { product} = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ? (
                        <div>Loading..</div>
                    ) : (
                        <ul className="products">
                        {this.props.products.map((product) => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                        <img className="imgProducts" src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>${product.price}</div>
                        <button onClick={ () => this.props.addToCart(product)} className="button primary">Add to Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </Fade>
                { product && 
                    <Zoom bottom>
                        <Modal isOpen={true} onRequestClose= {this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>X</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title} />
                                <div className="product-detail-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <Reveal effect="fadeInUp">
                                    <p>
                                        {product.description}
                                    </p>
                                    </Reveal>
                                    <p>
                                        Availabel Size {" "}
                                        {product.availableSizes.map((x) => (
                                            <span>
                                                {" "}
                                                <button className="button-success">{x}</button>
                                            </span>
                                            ))
                                        }
                                    </p>
                                    <div className="product-price">
                                        <div>
                                    Price:{" "}${product.price}
                                        </div>
                                        <div>
                                            <button className="button primary" onClick= {() =>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Zoom>
                        </Modal>
                    </Zoom>
                }
            </div>
        )
    }
}
export default connect((state) => ({
    products: state.products.filteredItems,
}),{fetchProducts, addToCart})(Products);