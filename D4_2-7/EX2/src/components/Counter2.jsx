import useIncrement from "../hooks/useIncrement";

const Counter2 = () => {
  const [count, increase] = useIncrement();
  return (
    <div>
      <h1>Count : {count}</h1>
      <button className="btn btn-primary" onClick={() => increase(2)}>
        Add 2
      </button>
    </div>
  );
};

export default Counter2;
