const Example1 = ({ name, address }) => {
  return (
    <div className="componentWrap">
      <h1>Example1 Component</h1>
      <h2>Example1 in__{name === "react" ? "react" : "other"}</h2>
      <h3>{name === "react" && "true"}</h3>
      <h3>{name === "react" || "false"}</h3>
      <h3>pros : {address}</h3>
    </div>
  );
};

export default Example1;
