import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewFeed } from 'store/modules/feedListReducer';

function Search() {
  const [searchItem, setSearchItem] = useState('');
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);

  //   const titleList = feedList.map((feed) => feed.title);
  //   const contentList = feedList.map((feed) => feed.content);

  const onSearch = () => {
    if (searchItem) {
      const searchDoneList = feedList.filter(
        (feed) => feed.title.includes(searchItem) || feed.content.includes(searchItem)
      );
      searchDoneList.length !== 0 ? dispatch(makeNewFeed(searchDoneList)) : alert('관련된 내용이 없습니다.');
      setSearchItem('');
    } else {
      alert('검색어를 입력해주세요');
    }
  };

  return (
    <>
      <input
        value={searchItem}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => {
          setSearchItem(e.target.value);
        }}
      ></input>
      <button onClick={onSearch}>검색</button>
    </>
  );
}

export default Search;
