import { useState } from "react";

const Event2 = () => {
  const [name, setName] = useState("noName");
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onClick = () => {
    if (name != "") {
      alert(name);
      setName("");
    }
  };
  return (
    <div className="componentWrap">
      <h1>Event2 Component</h1>
      <input
        type="text"
        placeholder="입력을 입력하세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={onKeyDown}
        style={{ width: "270px", height: "30px", padding: "0 10px" }}
      />
      <button onClick={onClick} style={{ marginLeft: "10px" }}>
        RESET
      </button>
      <h2>{name}</h2>
    </div>
  );
};

export default Event2;
