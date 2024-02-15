import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from 'firebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { changeEditDone, makeNewFeed } from 'store/modules/feedListReducer';
import { editContentHandeler } from 'store/modules/editedContentReducer';
import { getformattedDate } from 'components/common/util';

export default function MyFeed() {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);

  const editFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      if (foundFeed.email === auth.currentUser.email) {
        const editDoneFeed = { ...foundFeed, content: editedContent, editDone: true };

        const feedRef = doc(db, 'feedList', foundFeed.id);
        await updateDoc(feedRef, editDoneFeed);

        const editDoneList = feedList.map((feed) => (feed.id === foundFeed.id ? editDoneFeed : feed));
        dispatch(makeNewFeed(editDoneList));
      } else {
        alert('본인의 게시글만 수정할 수 있습니다.');
        return;
      }
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const deleteFeed = async (feedId) => {
    if (window.confirm("Eat's feed를 삭제하시겠습니까?")) {
      try {
        const foundFeed = feedList.find((feed) => feed.id === feedId);
        if (foundFeed.email === auth.currentUser.email) {
          const feedRef = doc(db, 'feedList', foundFeed.id);
          await deleteDoc(feedRef);
          const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
          dispatch(makeNewFeed(restList));
        } else {
          alert('본인의 게시글만 삭제할 수 있습니다.');
          return;
        }
      } catch (error) {
        alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
      }
    }
  };

  return (
    <StArticle>
      {auth.currentUser &&
        feedList
          .filter((feed) => feed.email === auth.currentUser.email)
          .map((feed) => (
            <StSection key={feed.id}>
              <StFigure>
                <img src={feed.imgURL} alt="맛집소개사진" />
              </StFigure>

              <StDiv>
                <h4>♥︎ {feed.feedCount}</h4>
                <h1>{feed.title}</h1> <br />
                <p>{feed.content}</p>
                <h5>{getformattedDate(feed.createdAt)}</h5>
                {feed.editDone ? (
                  <>
                    <StBtn
                      onClick={() => {
                        dispatch(editContentHandeler(feed.content));
                        dispatch(changeEditDone(feed.id));
                      }}
                    >
                      수정하기
                    </StBtn>
                  </>
                ) : (
                  <>
                    <StBtn
                      onClick={() => {
                        editFeed(feed.id);
                      }}
                    >
                      수정완료
                    </StBtn>
                    <textarea
                      value={editedContent}
                      onChange={(e) => {
                        dispatch(editContentHandeler(e.target.value));
                      }}
                    ></textarea>
                  </>
                )}
                <StBtn onClick={() => deleteFeed(feed.id)}>삭제하기</StBtn>
              </StDiv>
            </StSection>
          ))}
    </StArticle>
  );
}

const StArticle = styled.article`
  height: 85vh;

  border: 2px solid #fff;
  border-radius: 40px;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  overflow: auto;
`;

const StSection = styled.section`
  width: 90%;
  height: 200px;
  padding: 30px;
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #e0aed0;
  border-radius: 35px;
`;

const StFigure = styled.figure`
  width: 160px;
  height: 160px;

  & img {
    width: 100%;
    height: 100%;

    border-radius: 40px;
    object-fit: cover;
  }
`;

const StDiv = styled.div`
  width: 70%;
  padding-left: 20px;

  color: #503178;

  & h4 {
    padding-bottom: 5px;

    color: #e0aed0;
  }
  & h1 {
    font-size: 20px;
  }
  & p {
    text-align: left;
  }
  & h5 {
    padding-top: 10px;

    font-size: 12px;
    text-align: right;
  }
`;

const StBtn = styled.button`
  width: 100px;
  height: 30px;
  margin: 10px 5px;

  color: #fff;
  background-color: #e0aed0;
  border: none;
  border-radius: 10px;
`;
