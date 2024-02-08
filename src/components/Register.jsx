import { auth } from 'firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';

function Register() {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, 'test4@gmail.com', '12341234');
  }, []);
  return <div>Register</div>;
}

export default Register;
