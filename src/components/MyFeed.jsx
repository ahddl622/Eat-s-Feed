import { auth, db } from 'firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getformattedDate } from 'common/util';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { changeEditDone, makeNewFeed } from 'store/modules/feedListReducer';
import { editContentHandeler } from 'store/modules/editedContentReducer';
import styled from 'styled-components';

const StArticle = styled.article`
  height: 85vh;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
  overflow: scroll;
`;

const StSection = styled.section`
  padding: 10px;
`;

function MyFeed() {
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
            <StSection key={feed.id} style={{ width: '620px' }}>
              <div style={{ border: '1px solid black', margin: '10px' }}>
                <p style={{ fontSize: '20px', fontWeight: '600' }}>feed</p>
                <p>제목: {feed.title}</p> <br />
                <p>내용: {feed.content}</p>
                <div>
                  <img src={feed.imgURL} alt="맛집소개사진" style={{ width: '500px', height: '500px' }}></img>
                </div>
                {feed.editDone ? (
                  <>
                    <button
                      onClick={() => {
                        dispatch(editContentHandeler(feed.content));
                        dispatch(changeEditDone(feed.id));
                      }}
                    >
                      수정하기
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        editFeed(feed.id);
                      }}
                    >
                      수정완료
                    </button>
                    <textarea
                      value={editedContent}
                      onChange={(e) => {
                        dispatch(editContentHandeler(e.target.value));
                      }}
                    ></textarea>
                  </>
                )}
                <button onClick={() => deleteFeed(feed.id)}>삭제하기</button>
                <div>추천수: {feed.feedCount}</div>
                <p>최근 수정날짜: {getformattedDate(feed.createdAt)}</p>
              </div>
            </StSection>
          ))}
    </StArticle>
  );
}

export default MyFeed;
