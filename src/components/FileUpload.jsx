import { ref } from 'firebase/storage';
import { auth, storage } from 'firebaseConfig';
import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelect = (e) => {
    setSelectedFile(e.target.files);
  };

  const onUpload = async () => {
    const imgRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
  };

  return (
    <>
      <input type="file" onChange={onFileSelect}></input>
      <button>사진첨부하기</button>
    </>
  );
}

export default FileUpload;
