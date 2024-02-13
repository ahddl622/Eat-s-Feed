import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from 'firebaseConfig';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUrl } from '../redux/modules/imgURLReducer';

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
      dispatch(addUrl(downloadURL));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
      console.error('파일 저장 실패');
    }
    setSelectedFile(null);
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          onFileSelect(e);
        }}
      ></input>
      <button onClick={onUpload}>사진첨부하기</button>
    </>
  );
}

export default FileUpload;
