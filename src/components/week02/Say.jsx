import { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("click button");
  const onClickEnter = () => setMessage("입장완료");
  const onClickLeave = () => setMessage("퇴장완료");

  const [textColor, setTextColor] = useState("red");
  return (
    <div className="componentWrap">
      <h1>Say Component</h1>
      <div>
        <button onClick={onClickEnter} style={{ marginRight: "10px" }}>
          입장
        </button>
        <button onClick={onClickLeave}>퇴장</button>
        <h2 style={{ color: textColor }}>{message}</h2>
      </div>
      <>
        <button onClick={() => setTextColor("red")}>빨강</button>
        <button
          onClick={() => setTextColor("blue")}
          style={{ margin: "0 10px" }}
        >
          파랑
        </button>
        <button onClick={() => setTextColor("green")}>초록</button>
      </>
    </div>
  );
};

export default Say;
