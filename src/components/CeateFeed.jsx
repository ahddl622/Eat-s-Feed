import { auth, db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { myTitle } from 'store/modules/titleReducer';
import { myContent } from 'store/modules/contentReducer';
import { makeNewFeed } from 'store/modules/feedListReducer';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import FileUpload from './FileUpload';
import { useState } from 'react';
import styled from 'styled-components';
import { renewUrl } from 'store/modules/imgURLReducer';

// const BgWrap = styled.div`
//   /* width: 100vw;
//   height: 100vh; */
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: #ffffff6d;
// `;

const CreateFeedDiv = styled.div`
  position: fixed;
  top: 20%;
  left: 35%;
  width: 500px;
  height: 470px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;

  border-radius: 40px;
  color: #503178;
  background-color: #fff;
  border: 2px solid #e0aed0;
  /* box-shadow: 3px 5px 30px 10px #ffe5e5; */
`;

const XBtn = styled.button`
  width: 50px;
  height: 30px;
  margin: 0 5px 0 auto;

  font-size: 20px;
  border: none;
  color: #fff;
  background-color: #e0aed0;
  border-radius: 15px;
  cursor: pointer;
`;

const IntroUrMatJipP = styled.p`
  height: 30px;
  margin-bottom: 5px;

  font-size: 24px;
  font-weight: 600;
`;

const MatjipContent = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 6px;
`;

const MatjipContentTextArea = styled.textarea`
  width: 450px;
  height: ${({ title }) => (title ? '40px' : '80px')};
  margin: 0 auto;
  padding: 10px;
  resize: none;

  border-radius: 10px;
  border: 1px solid #e0aed0;
`;

const SelectDiv = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
`;

const SelectBox = styled.select`
  width: 140px;
  height: 30px;
  border-radius: px;
  border: 3px solid lightgray;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  width: 150px;
  height: 30px;
  background-color: #e0aed0;
  border-radius: 10px;
  border: 1px solid #ac87c5;
  margin: 0 5px 0 auto;
  cursor: pointer;
`;

const FoodCategory = styled.label`
  font-size: 14px;
  margin-left: 8px;
`;

function CreateFeed({ setNewFeed }) {
  console.log(auth.currentUser);
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const imgURL = useSelector((state) => state.imgURLReducer);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const loginProfile = useSelector((state) => state.loginProfileReducer);

  const fetchFeedData = async () => {
    try {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        const feed = { id: doc.id, ...doc.data() };
        newFeedArr.push(feed);
      });
      dispatch(makeNewFeed(newFeedArr));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  // 새 feed를 추가하려면 새 feed를 db에 추가한 뒤, 추가가 완료된 feedList를 db에서 가져와서 store에도 넣어줘야
  // -> db와 store 둘 다에 모두 추가가능
  const addFeed = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    try {
      if (user && title && content) {
        const newFeed = {
          email: auth.currentUser.email,
          nickname: loginProfile.nickname,
          title,
          content,
          imgURL,
          feedCount: 0,
          createdAt: String(new Date()),
          editDone: true,
          uid: user.uid,
          category
        };
        setNewFeed(false);
        const collectionRef = collection(db, 'feedList');
        await addDoc(collectionRef, newFeed);
        // **
        await fetchFeedData();
        dispatch(myTitle(''));
        dispatch(myContent(''));
      }
      if (!title) {
        alert('제목을 입력해주세요');
      }
      if (!content) {
        alert('내용을 입력해주세요');
      }
      if (!user) {
        alert('글 작성을 위해 로그인 해주세요');
      }
    } catch (error) {
      alert('저장할 수 없습니다. 관리자에게 문의하세요.');
    }
  };
  return (
    // <BgWrap>
    <CreateFeedDiv>
      <XBtn onClick={() => setNewFeed(false)}>x</XBtn>

      <IntroUrMatJipP>여러분의 맛집을 소개해주세요!</IntroUrMatJipP>
      <FileUpload />

      <MatjipContent>맛집의 지역과 상호명을 기재해주세요</MatjipContent>
      <MatjipContentTextArea
        value={title}
        placeholder="ex) 안국역 도토리가든"
        onChange={(e) => dispatch(myTitle(e.target.value))}
      ></MatjipContentTextArea>
      <MatjipContent>어떤 점이 좋았나요?</MatjipContent>
      <MatjipContentTextArea
        value={content}
        placeholder="ex ) 도토리 브레드 너무 맛있었어요."
        onChange={(e) => dispatch(myContent(e.target.value))}
      ></MatjipContentTextArea>

      <SelectDiv>
        <FoodCategory>음식의 카테고리를 선택해주세요</FoodCategory>
        <SelectBox onChange={(e) => setCategory(e.target.options[e.target.options.selectedIndex].value)}>
          <option defaultValue>메뉴</option>
          <option value="일식">일식</option>
          <option value="중식">중식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="디저트">디저트</option>
        </SelectBox>
      </SelectDiv>

      <SubmitBtn
        onClick={(e) => {
          if (imgURL === '') {
            alert('사진 첨부하기를 눌러주세요');
            return;
          } else {
            addFeed(e);
            dispatch(renewUrl());
          }
        }}
      >
        저장하기
      </SubmitBtn>
    </CreateFeedDiv>
    // </BgWrap>
  );
}

export default CreateFeed;
