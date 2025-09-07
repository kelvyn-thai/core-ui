import { useState } from 'react';
import { Button } from './@button';

function App() {
  const [count, setCount] = useState<number>(1);

  return (
    <div>
      <p className="text-primary-500 text-base font-medium">Hello World!</p>
      <p>{count}</p>
      <p>Updated content!</p>
      <Button onClick={() => setCount(count + 1)}>Click</Button>
    </div>
  );
}

export default App;
