import { useState, useRef } from "react";

const Product = () => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    facture: "APPLE",
  });

  const { name, price, facture } = form;
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onClickRegister = () => {
    if (window.confirm("Register Product?")) {
      alert(
        `Product Name: ${name} \n Product Price: ${price} \n Product Facture: ${facture}`
      );
      setForm({
        name: "",
        price: 0,
        facture: "APPLE",
      });
      ref_name.current.focus();
    } else {
      alert("Register Failed");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickRegister();
    }
  };

  const ref_name = useRef(null);
  return (
    <div className="componentWrap">
      <h1>Product Component</h1>
      <input
        ref={ref_name}
        onChange={onChange}
        name="name"
        type="text"
        style={{ marginRight: "10px" }}
        placeholder="Product Name"
        value={name}
      />
      <input
        onChange={onChange}
        name="price"
        type="text"
        style={{ marginRight: "10px" }}
        placeholder="Product Price"
        value={price}
      />
      <input
        onChange={onChange}
        name="facture"
        type="text"
        style={{ marginRight: "10px" }}
        placeholder="Product facture"
        value={facture}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClickRegister}>Add Product</button>
      <div>
        <p>Product Name: {name}</p>
        <p>Product Price: {price}</p>
        <p>Product Facture: {facture}</p>
      </div>
    </div>
  );
};

export default Product;
