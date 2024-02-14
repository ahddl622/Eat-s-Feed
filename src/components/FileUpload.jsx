import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from 'firebaseConfig';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUrl } from 'store/modules/imgURLReducer';
import styled from 'styled-components';

const UploadImgDiv = styled.div`
  display: flex;
  width: 450px;
  justify-content: space-between;
`;

const UploadImgInput = styled.input`
  border: 2px solid lightgray;
  border-radius: 5px;
`;
const UploadImgBtn = styled.button`
  border: 2px solid lightgray;
  border-radius: 5px;
`;

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const onFileSelect = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onUpload = async () => {
    try {
      const imgRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
      await uploadBytes(imgRef, selectedFile);
      console.log('파일 저장 성공');
      const downloadURL = await getDownloadURL(imgRef);
      console.log('URL 받기도 성공!', downloadURL);
      alert('이미지를 업로드 성공!');
      dispatch(addUrl(downloadURL));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
      console.error('파일 저장 실패');
    }
    setSelectedFile(null);
  };

  return (
    <UploadImgDiv>
      <UploadImgInput
        type="file"
        onChange={(e) => {
          onFileSelect(e);
        }}
      ></UploadImgInput>
      <UploadImgBtn onClick={onUpload}>사진첨부하기</UploadImgBtn>
    </UploadImgDiv>
  );
}

export default FileUpload;
