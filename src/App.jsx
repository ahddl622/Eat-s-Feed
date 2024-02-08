import { useEffect } from 'react';
import { app } from './firebase';
import Router from 'shared/Router';

function App() {
  useEffect(() => {
    console.log('firebase에서 app 잘 가져와지나요?', app);
  });
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
