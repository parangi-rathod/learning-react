import React, { useState } from 'react'

export function UseMemoImplementation() {
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState('white');


  const increment = () => {
    setCount((c) => c + 1);
    // expensiveCalculation(count + 1);
  };

  const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};


  return (
     <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md" style={{ background }}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        useMemo Implementation
      </h2>
      
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Count: {count}</h1>
        <p className="text-lg text-gray-600">
          Expensive Result: {expensiveCalculation.toLocaleString()}
        </p>
        
        <div className="flex gap-2 justify-center">
          <button 
            onClick={increment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + (useMemo)
          </button>
          
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increment
          </button>
          
          <button 
            onClick={() => setBackground(background === 'white' ? 'lightblue' : 'white')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Toggle Background
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Open DevTools console to see when calculation runs!
          <br />
          Notice: Calculation only runs when count changes, not on background toggle.
        </div>
      </div>
    </div>
  )
}