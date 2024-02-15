import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewFeed } from 'store/modules/feedListReducer';

export default function Search() {
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

const SearchDiv = styled.form`
  height: 40px;
  padding: 0 5px;
  display: flex;
  align-items: center;

  border-radius: 10px;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 660px;
  padding-left: 10px;

  border: solid 1px #e0aed0;
  border-radius: 10px;
`;

const SearchBtn = styled.button`
  width: 63px;
  height: 30px;
  margin-left: 5px;

  color: white;
  background-color: #e0aed0;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;
