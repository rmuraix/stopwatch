import { useState } from "react";
// This code is based on miyakei1225/React-Hands-on-Stopwatch
function App() {
  const [time, setTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [buttonText, setButtonText] = useState<string>("Start");

  // When the Start/Stop button is pressed.
  const handleStartStop = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      setButtonText("Start");
    } else {
      // Overwrite the time variable every 10 milliseconds
      const id: NodeJS.Timeout = setInterval(
        () => setTime((prevTime) => prevTime + 10),
        10
      );
      setTimerId(id);
      setButtonText("Stop");
    }
  };

  // When the reset button is pressed
  const handleReset = () => {
    setTime(0);
    if (timerId) clearInterval(timerId);
    setTimerId(null);
  };

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="py-8 text-center text-4xl">
          {(time / 1000).toFixed(2)} s
        </div>
        <div className="flex flex-row text-center">
          <div className="flex-1">
            <button
              onClick={handleStartStop}
              className="w-5/6 rounded bg-gray-900 py-2 text-white hover:bg-gray-800"
            >
              {buttonText}
            </button>
          </div>
          <div className="flex-1">
            <button
              onClick={handleReset}
              className="w-5/6 rounded bg-gray-100 py-2 text-black hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
