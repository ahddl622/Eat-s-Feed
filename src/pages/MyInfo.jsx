import { db } from 'firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StWrap = styled.div`
  text-align: center;
  height: 20vh;
  line-height: 20vh;
`;

const StArticle = styled.article`
  width: 35vw;
  height: 60svh;
  margin: 0 auto;
  padding: 10px;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

const StH1 = styled.h1`
  font-size: 40px;
`;

function MyInfo() {
  const [data, setData] = useState([]);
  const [userNickName, setUserNickName] = useState('');
  const [userId, setUserId] = useState('');
  console.log(userId);
  console.log(data);

  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        setData(doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(data);
        setUserId(doc.id);
      });
    };

    fetchUserData();
  }, []);

  const test = (e) => {
    setUserNickName(e.target.value);
    // console.log(userNickName);
  };

  const cloudeTest = async () => {
    const infoRef = doc(db, 'profile', userId);
    await updateDoc(infoRef, { ...data, nickName: userNickName });
  };
  return (
    <StWrap>
      <StH1>반갑습니다 user님!</StH1>
      <StArticle>
        MyInfo
        <input valu={userNickName} onChange={test} />
        <button onClick={cloudeTest}>click</button>
      </StArticle>
    </StWrap>
  );
}

export default MyInfo;
