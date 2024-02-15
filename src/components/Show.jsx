import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getformattedDate } from 'common/util';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { editContentHandeler } from 'store/modules/editedContentReducer';
import {
  changeEditDone,
  editFeedList,
  makeNewFeed,
  minusFeedCount,
  plusFeedCount
} from 'store/modules/feedListReducer';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import styled from 'styled-components';

const FeedDiv = styled.div`
  width: 680px;
  margin: 10px;
  padding: 15px;
  border: solid 2px #ac87c5;
  display: flex;
  justify-content: center;
  border-radius: 15px;
`;

const FeedTitleP = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FeednicknameP = styled.p`
  text-align: end;
`;

const FeedContentNImg = styled.div`
  display: flex;
  gap: 15px;
  margin: 10px 0;
`;

const FeedContentDiv = styled.div`
  border: solid 1px #ac87c5;
  border-radius: 8px;
  width: 300px;
  padding: 10px;

  & p {
    line-height: 25px;
  }
`;

const FeedImgDiv = styled.div`
  width: 300px;
  height: 280px;
`;

const FeedImg = styled.img`
  width: 300px;
  height: 280px;
  border-radius: 5px;
  object-fit: cover;
`;

const BtnsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const DeleteBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 0 3px;
  color: white;
  background-color: #ac87c5;
  border: solid 1px #ac87c5;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const EditTextArea = styled.textarea`
  resize: none;
`;

const EditNDeleteBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 0 3px;
  background-color: white;
  border: solid 1px #ac87c5;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const GoodOrBadBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 0 3px;
  border: solid 1px #756ab6;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const LatestDateP = styled.p`
  text-align: end;
  font-size: 14px;
`;

function Show({ menu }) {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);

  // 페이지가 mount 되자마자 db에 저장되어 있는 feedList 가져와서 자동생성된 id 부여하여 store에 저장
  // -> 그래야 store에 저장된 feedList대로 화면에 뿌릴 수 있음
  useEffect(() => {
    const fetchFeedData = async () => {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        const feed = { id: doc.id, ...doc.data() };
        newFeedArr.push(feed);
      });
      dispatch(makeNewFeed(newFeedArr));
    };
    fetchFeedData();
  }, [dispatch]);

  // myPage에서 수정 및 삭제 가능하지만 MainPage에서도 나열되어있는 피드 각각을 수정 및 삭제 가능하도록 함
  // 로그인 데이터 공유되면 내 id의 feed만 수정 및 삭제 가능하도록 할 예정
  const editFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const editDoneFeed = { ...foundFeed, content: editedContent, editDone: true, createdAt: String(new Date()) };

      const feedRef = doc(db, 'feedList', foundFeed.id);
      await updateDoc(feedRef, editDoneFeed);

      dispatch(editFeedList(editDoneFeed));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const deleteFeed = async (feedId) => {
    if (window.confirm("Eat's feed를 삭제하시겠습니까?")) {
      try {
        const foundFeed = feedList.find((feed) => feed.id === feedId);
        const feedRef = doc(db, 'feedList', foundFeed.id);
        await deleteDoc(feedRef);
        const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
        dispatch(makeNewFeed(restList));
      } catch (error) {
        alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
      }
    }
  };

  const plusCountFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const plusCountFeed = { ...foundFeed, feedCount: foundFeed.feedCount + 1 };
      const feedRef = doc(db, 'feedList', feedId);
      await updateDoc(feedRef, plusCountFeed);
      dispatch(plusFeedCount(feedId));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const minusCountFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const minusCountFeed = { ...foundFeed, feedCount: foundFeed.feedCount - 1 };
      const feedRef = doc(db, 'feedList', feedId);
      await updateDoc(feedRef, minusCountFeed);
      dispatch(minusFeedCount(feedId));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  console.log(feedList);

  return (
    <>
      {feedList
        .filter((feed) => (menu === '전체' || menu.length === 0 ? true : feed.category === menu))
        .map((feed) => (
          <FeedDiv key={feed.id}>
            <div>
              <FeedTitleP>{feed.title}</FeedTitleP>
              <FeednicknameP>{feed.nickname}님이 알려주신 맛집</FeednicknameP>
              <FeedContentNImg>
                <FeedContentDiv>
                  <p>{feed.content}</p>
                </FeedContentDiv>
                <FeedImgDiv>
                  <FeedImg src={feed.imgURL} alt="맛집소개사진"></FeedImg>
                </FeedImgDiv>
              </FeedContentNImg>
              <BtnsDiv>
                <div>
                  {feed.editDone ? (
                    <EditNDeleteBtn
                      onClick={() => {
                        if (auth.currentUser) {
                          if (auth.currentUser.email === feed.email) {
                            dispatch(editContentHandeler(feed.content));
                            dispatch(changeEditDone(feed.id));
                          } else {
                            alert('본인의 게시글만 수정할 수 있습니다.');
                            return;
                          }
                        } else {
                          alert('로그인 후 이용해주세요');
                        }
                      }}
                    >
                      수정하기
                    </EditNDeleteBtn>
                  ) : (
                    <>
                      <EditNDeleteBtn
                        onClick={() => {
                          editFeed(feed.id);
                        }}
                      >
                        수정완료
                      </EditNDeleteBtn>
                      <EditTextArea
                        value={editedContent}
                        onChange={(e) => {
                          dispatch(editContentHandeler(e.target.value));
                        }}
                      ></EditTextArea>
                    </>
                  )}
                  <DeleteBtn
                    onClick={() => {
                      if (auth.currentUser) {
                        if (auth.currentUser.email === feed.email) {
                          deleteFeed(feed.id);
                        } else {
                          alert('본인의 게시글만 삭제할 수 있습니다.');
                          return;
                        }
                      } else {
                        alert('로그인 후 이용해주세요');
                      }
                    }}
                  >
                    삭제하기
                  </DeleteBtn>
                </div>

                <div>
                  <GoodOrBadBtn onClick={() => plusCountFeed(feed.id)}>추천</GoodOrBadBtn>
                  <GoodOrBadBtn onClick={() => minusCountFeed(feed.id)}>비추천</GoodOrBadBtn>♥ {feed.feedCount}
                </div>
              </BtnsDiv>
              <LatestDateP>최근 수정날짜 {getformattedDate(feed.createdAt)}</LatestDateP>
            </div>
          </FeedDiv>
        ))}
    </>
  );
}

export default Show;
