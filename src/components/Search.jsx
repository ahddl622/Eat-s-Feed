import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewFeed } from 'store/modules/feedListReducer';
import styled from 'styled-components';

const SearchDiv = styled.form`
  background-color: #ac87c5;
  height: 40px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  padding: 0 5px;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 675px;
  padding-left: 10px;
  border-radius: 10px;
  border: solid 1px #503178;
`;

const SearchBtn = styled.button`
  border: solid 3px #503178;
  background-color: #503178;
  color: white;
  border-radius: 3px;
  width: 63px;
  height: 30px;
  margin-left: 2px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

function Search() {
  const [searchItem, setSearchItem] = useState('');
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);

  const onSearch = (e) => {
    e.preventDefault();
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
    <SearchDiv>
      <SearchInput
        value={searchItem}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => {
          setSearchItem(e.target.value);
        }}
      ></SearchInput>
      <SearchBtn onClick={onSearch}>검색</SearchBtn>
    </SearchDiv>
  );
}

export default Search;
