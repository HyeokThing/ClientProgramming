const Example2 = ({ name, address }) => {
  const style = {
    backgroundColor: "#4c5363",
    color: "yellow",
  };
  return (
    <div className="componentWrap">
      <h1>Example2 Component</h1>
      <h2 style={style}>except style</h2>
      <h2 style={style}>hi</h2>
      <p>
        props data <br />
        name : {name}, address : {address}
      </p>
    </div>
  );
};

export default Example2;
