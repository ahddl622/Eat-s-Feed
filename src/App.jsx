
import { app } from './firebase';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    console.log('firebase에서 app 잘 가져와지나요?', app);
  });
  return <div>App</div>;
}

export default App;
