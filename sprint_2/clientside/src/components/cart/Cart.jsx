import {useEffect, useState} from "react";
import './cart.css'
import { useAppContext } from "../../store/context";

function Cart() {
  const { state, dispatch } = useAppContext();
 
  const handleRemoveFromCart = (index) => {
    dispatch({ type: "DELETE_ITEM", payload: index });
  }
  
  const handleQuantityChange = ( bookId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { bookId, quantity } });
  };
  let subToltal = 0;
  let grandtotal = 0;
  let tax = 0;
  const cartItems = state.cartItems;

  let shiping = cartItems.length>0 ? 15 : 0;
    return (
      <div className="contain">
        

      <div className="shopping-cart">

        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
          
        </div>
        {
          state.cartItems.map((item,index)=>{
            const quantity = item.quantity;
            const price = item.price; 
            subToltal += quantity * price;
            tax = subToltal * 5 / 100;
            grandtotal = subToltal + tax + shiping;
            return (
              <div className="product" key={index}>
                <div className="product-image">
                  <img src={item.thumbnail}/>
                </div>
                <div className="product-details">
                  <h4>Title: {item.title}</h4>
                  <h4>Author: {item.authors}</h4>
                  <p className="product-description">{item.description}</p>
                </div>
                <div className="product-price">{item.price}</div>
                <div className="product-quantity">
                  <input type="number" value={item.quantity} min="1" onChange={(e) => handleQuantityChange(item.bookId, e.target.value)}/>
                </div>
                <div className="product-removal">
                  <button className="remove-product" onClick={() => handleRemoveFromCart(item.bookId)}>
                    Remove
                  </button>
                </div>
                <div className="product-line-price">{ item.quantity * item.price }</div>
              </div>
            );
            
            
          })
        }

        <div className="totals">
          <div className="totals-item">
            <label>Subtotal</label>
            <div className="totals-value" id="cart-subtotal">{parseFloat(subToltal.toFixed(3))}</div>
          </div>
          <div className="totals-item">
            <label>Tax (5%)</label>
            <div className="totals-value" id="cart-tax">{parseFloat(tax.toFixed(3))}</div>
          </div>
          <div className="totals-item">
            <label>Shipping</label>
            <div className="totals-value" id="cart-shipping"> {shiping}</div>
          </div>
          <div className="totals-item totals-item-total">
            <label>Grand Total</label>
            <div className="totals-value" id="cart-total">{parseFloat(grandtotal.toFixed(3))}</div>
          </div>
        </div>
            
            <button className="checkout">Checkout</button>

      </div>
      </div>

    )

}
export default Cart;