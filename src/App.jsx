import React, { useEffect } from 'react';
import { app } from './firebase';

function App() {
  useEffect(() => {
    console.log('firebase에서 app 잘 가져와지나요?', app);
  });
  return <div>App</div>;
}

export default App;
