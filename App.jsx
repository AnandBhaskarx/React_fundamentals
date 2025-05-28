import { useEffect, useState, useCallback, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&()*+,-./:;<=>?@[\]^_`{|}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 18);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <>
      <div className="w-[500px] mx-auto shadow-lg rounded-lg px-6 py-4 mt-10 bg-gray-800 fixed top-1/4 left-1/2 transform -translate-x-1/2">
        <h1 className="text-white text-center text-xl font-semibold mb-3">Password Generator</h1>

        {/* Input Field & Copy Button (Inline) */}
        <div className="flex items-center bg-gray-700 rounded-md overflow-hidden shadow-md mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-2 px-3 bg-white text-gray-700"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600 transition duration-300 ease-in-out rounded-md ml-2"
          >
            Copy
          </button>
        </div>

        {/* Controls in a Single Line */}
        <div className="flex items-center justify-between text-sm text-white">
          {/* Length Selector (Inline with Value) */}
          <div className="flex items-center gap-2">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-32"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          {/* Checkboxes (Side by Side) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              <label htmlFor="charInput">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
