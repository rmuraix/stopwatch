import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Hello, world</h1>
      </div>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
