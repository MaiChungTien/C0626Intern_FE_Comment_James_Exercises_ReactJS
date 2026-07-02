import useIncrement from "../hooks/useIncrement";

const Counter1 = () => {
  const [count, increase] = useIncrement();
  return (
    <div>
      <h1>Count : {count}</h1>
      <button className="btn btn-primary" onClick={() => increase(1)}>
        Add 1
      </button>
    </div>
  );
};

export default Counter1;
