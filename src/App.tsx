import { useState } from "react";
// This code is based on miyakei1225/React-Hands-on-Stopwatch
function App() {
  const [time, setTime] = useState<number>(0);
  const [lapTime, setLapTime] = useState<number[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // When the Start/Stop button is pressed.
  const handleStartStop = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      setIsRunning(false);
    } else {
      // Overwrite the time variable every 10 milliseconds
      const id: NodeJS.Timeout = setInterval(
        () => setTime((prevTime) => prevTime + 10),
        10
      );
      setTimerId(id);
      setIsRunning(true);
    }
  };

  // When the reset button is pressed
  const handleReset = () => {
    setTime(0);
    if (timerId) clearInterval(timerId);
    setTimerId(null);
    setIsRunning(false);
    setLapTime([]);
  };

  // When the lap button is pressed
  const handleLap = () => {
    setLapTime([...lapTime, time]);
  };

  const lap = lapTime.map((element, index) => {
    return (
      <li key={index}>
        <p>
          {index + 1}: {(element / 1000).toFixed(2)} s
        </p>
      </li>
    );
  });

  return (
    <>
      <div className="text-center md:container md:mx-auto">
        <div className="py-8 text-4xl">{(time / 1000).toFixed(2)} s</div>
        <div className="flex flex-row">
          <div className="flex-1">
            <button
              onClick={handleReset}
              className="w-5/6 rounded bg-gray-100 py-2 text-black hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleStartStop}
              className="w-5/6 rounded bg-gray-900 py-2 text-white hover:bg-gray-800"
            >
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleLap}
              className="w-5/6 rounded bg-gray-100 py-2 text-black hover:bg-gray-50"
            >
              Lap
            </button>
          </div>
        </div>
        <ol>{lap}</ol>
      </div>
    </>
  );
}

export default App;
