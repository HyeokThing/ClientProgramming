import { useState, useRef } from "react";
import { div } from "three/tsl";

const Fruits = () => {
  const [name, setName] = useState("");
  const next_id = useRef(4);
  const onClickRegister = () => {
    const data = Fruits.concat({ id: next_id.current, name: name });
    setFruits(data);
    next_id.current++;
    setName("");
  };
  const onKeyDownName = (e) => {
    if (e.key === "Enter") {
      onClickRegister();
    }
  };

  const [Fruits, setFruits] = useState([
    { id: 1, name: "apple" },
    { id: 2, name: "apple mango" },
    { id: 3, name: "banana" },
  ]);
  const onClickDelete = (id) => {
    if (window.confirm(`Delete this: ${id}?`)) {
      const data = Fruits.filter((f) => f.id != id);
      setFruits(data);
    }
  };
  return (
    <div className="componentWrap">
      <h1>Fruits Component</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a fruit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKeyDownName}
        />
        <button onClick={onClickRegister}>Add</button>
      </div>
      {Fruits.map((f) => (
        <div key={f.id}>
          <span style={{ fontSize: "15px" }}>{f.id} :</span>
          <span style={{ marginLeft: "5px" }}>{f.name}</span>
          <button
            style={{ marginLeft: "10px", background: "none" }}
            onClick={() => onClickDelete(f.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Fruits;
