import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../firebase';

const StSection = styled.section`
  padding: 10px;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

function Profile() {
  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(data);
      });
    };

    fetchUserData();
  }, []);
  return <StSection>Profile</StSection>;
}

export default Profile;
