import { useState, useRef } from "react";

const Foods = () => {
  const next_id = useRef(4);
  const [foods, setFoods] = useState([
    { id: 1, name: "chicken" },
    { id: 2, name: "pizza" },
    { id: 3, name: "hamburger" },
  ]);

  const [name, setName] = useState("");

  const onClickRemove = (id) => {
    if (window.confirm(`${id} : delete?`)) {
      const data = foods.filter((food) => food.id !== id);
      setFoods(data);
    }
  };

  const onKeyDownName = (e) => {
    if (e.key === "Enter") {
      if (name === "") {
        alert("Enter a Food Name");
      } else {
        const data = foods.concat({ id: next_id.current, name: name });
        setFoods(data);
        next_id.current++;
        setName("");
      }
    }
  };
  return (
    <div className="componentWrap">
      <h1>Foods Component</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a food"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKeyDownName}
        />
        <button>Add</button>
      </div>
      {foods.map((food, index) => {
        return (
          <div key={food.id}>
            <span style={{ marginLeft: "10px" }}>{food.id} :</span>
            <span style={{ marginLeft: "10px" }}>{food.name}</span>
            <button
              onClick={() => onClickRemove(food.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Foods;
