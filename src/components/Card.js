import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart();
  console.log("Cart data:", data); // Logs the initial cart data

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  console.log("Options:", options); // Logs the available options

  let priceOptions = Object.keys(options);
  console.log("Price options:", priceOptions); // Logs the keys of options

  let foodItem = props.item;
  console.log("Food item:", foodItem); // Logs the current food item details

  const dispatch = useDispatchCart();

  const handleClick = () => {
    console.log("Token check in localStorage");
    if (!localStorage.getItem("token")) {
      console.log("No token found, navigating to login");
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
    console.log("Quantity selected:", e.target.value); // Logs the selected quantity
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
    console.log("Size selected:", e.target.value); // Logs the selected size
  };

  const handleAddToCart = async () => {
    console.log("Adding to cart...");
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {

        console.log("item.id is " +item.id);
        console.log("foodItem._id is " +foodItem._id);
        
        food = item;
        console.log("item is " +JSON.stringify(item));
        console.log("food  is " +JSON.stringify(food));
        console.log("Matching item found in cart:", food); // Logs the matching item
        break;
      }
    }

    console.log("Food after search:", food);
    console.log("Date of addition:", new Date());

    if (food !== []) {
      if (food.size === size) {
        console.log("Item already exists with the same size, updating quantity");
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        console.log("food.size isfood.size is " +food.size);
        console.log("size is " +size);
        console.log("Item exists with a different size, adding a new entry");
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        return;
      }
      return;
    }

    console.log("Adding new item to cart:", { id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
    console.log("Default size set:", priceRef.current.value); // Logs the default size set during initial render
  }, []);

  let finalPrice = qty * parseInt(options[size]); // Calculates the final price
  console.log("Final price:", finalPrice); // Logs the calculated final price

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return <option key={i + 1} value={i + 1}>{i + 1}</option>;
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>;
              })}
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
