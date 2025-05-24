const Counter1 = () => {
  let number = 0;
  return (
    <div className="componentWrap">
      <h1>Counter1 Component</h1>
      <div>
        <button
          onClick={() => {
            number--;
            alert(number);
          }}
        >
          -
        </button>
        <span style={{ margin: "0 10px" }}>{number}</span>
        <button
          onClick={() => {
            number++;
            alert(number);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter1;
