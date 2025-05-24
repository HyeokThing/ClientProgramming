import { useState, useRef } from "react";

const Join = () => {
  const [name, setName] = useState("NAME");
  const [phone, setPhone] = useState("PHONE");
  const [address, setAddress] = useState("ADDRESS");
  const ref_name = useRef(null);

  const onClickRegister = () => {
    if (window.confirm("Register NOW?")) {
      alert(`Name : ${name} \n Tel : ${phone} \n Address : ${address}`);
      setName("");
      setPhone("");
      setAddress("");
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

  return (
    <div className="componentWrap">
      <h1>Join Component</h1>
      <input
        ref={ref_name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder="name"
        value={name}
        style={{ marginRight: "10px" }}
      />
      <input
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        type="text"
        placeholder="tel"
        value={phone}
        style={{ marginRight: "10px" }}
      />
      <input
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        onKeyDown={onKeyDown}
        type="text"
        value={address}
        placeholder="address"
      />
      <button onClick={onClickRegister}>Join</button>
      <div>
        <p>Name : {name}</p>
        <p>Tel : {phone}</p>
        <p>Address : {address}</p>
      </div>
    </div>
  );
};
export default Join;
