import { useEffect } from 'react';
import { auth } from './firebase';
import Main from 'pages/Main';
import { createUserWithEmailAndPassword } from '@firebase/auth';

function App() {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, 'test4@gmail.com', '12341234');
  }, []);

  return (
    <div>
      App
      <Main />
    </div>
  );
}

export default App;
