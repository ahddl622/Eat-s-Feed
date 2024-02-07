import React, { useEffect } from 'react';
import { app } from './firebase';
import Main from 'pages/Main';

function App() {
  useEffect(() => {
    console.log('firebase에서 app 잘 가져와지나요?', app);
  });
  return (
    <div>
      App
      <Main />
    </div>
  );
}

export default App;
