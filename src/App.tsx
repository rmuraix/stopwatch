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
        10,
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
      <div key={index}>
        {index + 1}: {(element / 1000).toFixed(2)} s
      </div>
    );
  });

  return (
    <>
      <div className="max-h-screen text-center md:container md:mx-auto">
        <div className="py-8 text-4xl">{(time / 1000).toFixed(2)} s</div>
        <div className="flex flex-row">
          <div className="flex-1">
            <button
              onClick={handleReset}
              className="w-5/6 rounded border border-slate-300 bg-gray-800 py-4 text-white hover:bg-gray-900"
            >
              Reset
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleStartStop}
              className="w-5/6 rounded bg-indigo-500 py-4 text-white hover:bg-indigo-600"
            >
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleLap}
              disabled={isRunning ? false : true}
              className="w-5/6 rounded border border-slate-300 bg-gray-800 py-4 text-white hover:bg-gray-900 disabled:bg-transparent disabled:text-black"
            >
              Lap
            </button>
          </div>
        </div>
        <div className="py-8">
          <div className="h-80 overflow-y-auto">{lap}</div>
        </div>
      </div>
    </>
  );
}

export default App;
