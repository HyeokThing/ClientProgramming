import { useState } from "react";

const Event1 = () => {
  const [isToggle, setIsToggle] = useState(false);
  const onClick = () => {
    if (window.confirm("상태변경체크")) {
      setIsToggle(!isToggle);
    }
  };
  return (
    <div className="componentWrap">
      <h1>Event1 Component</h1>
      <button onClick={onClick}>{isToggle ? "ON" : "OFF"}</button>
    </div>
  );
};

export default Event1;
