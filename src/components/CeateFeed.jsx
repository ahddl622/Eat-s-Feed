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

const CreateFeedDiv = styled.div`
  position: fixed;
  background-color: #f3f3f3;
  top: 20%;
  left: 35%;
  width: 500px;
  height: 470px;
  opacity: 0.95;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 15px;
  border: 4px solid #e0aed0;
  padding: 10px 15px 20px 15px;
`;

const XBtn = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 5px 0 auto;
`;

const IntroUrMatJipP = styled.p`
  font-size: 24px;
  font-weight: 600;
  height: 30px;
  margin-bottom: 5px;
`;

const MatjipContent = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const MatjipContentTextArea = styled.textarea`
  width: 450px;
  margin: 0 auto;
  height: ${({ title }) => (title ? '40px' : '80px')};
  border: 2px solid lightgray;
  border-radius: 5px;
  resize: none;
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
`;

const SubmitBtn = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 10px;
  border: 3px solid lightgray;
  margin: 0 5px 0 auto;
`;

function CreateFeed({ setNewFeed }) {
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const imgURL = useSelector((state) => state.imgURLReducer);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  // const loginProfile = useSelector((state) => state.loginProfileReducer);

  const fetchFeedData = async () => {
    try {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
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
          // nickname: loginProfile.nickname,
          title,
          content,
          imgURL,
          feedCount: 0,
          createdAt: String(new Date()),
          editDone: true,
          uid: user.uid,
          category
        };
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
    <CreateFeedDiv>
      <XBtn onClick={() => setNewFeed(false)}>x</XBtn>

      <IntroUrMatJipP>여러분의 맛집을 소개해주세요!</IntroUrMatJipP>
      <FileUpload />

      <MatjipContent>맛집의 지역과 상호명을 기재해주세요</MatjipContent>
      <MatjipContentTextArea
        value={title}
        placeholder="맛집의 지역과 상호명을 기재해주세요"
        onChange={(e) => dispatch(myTitle(e.target.value))}
      ></MatjipContentTextArea>
      <MatjipContent>어떤 점이 좋았나요?</MatjipContent>
      <MatjipContentTextArea
        value={content}
        placeholder="어떤 점이 좋았나요? 당신의 최애 메뉴는?"
        onChange={(e) => dispatch(myContent(e.target.value))}
      ></MatjipContentTextArea>

      <SelectDiv>
        <label>음식의 카테고리를 선택해주세요</label>
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
  );
}

export default CreateFeed;
