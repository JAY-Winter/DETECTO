import { css } from '@emotion/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button } from '@mui/material';

type DragAndDropProps = {
  isDragging: boolean,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: File | null,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}

function DragAndDrop({ isDragging, setIsDragging, selectedFile, setSelectedFile }: DragAndDropProps) {
  const countRef = useRef(0);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    countRef.current += 1;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    countRef.current -= 1;
    if (countRef.current === 0) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0]
      setSelectedFile(file);
      // console.log('드롭한 파일:', files[0]);
      // 여기에서 파일을 처리하거나 업로드를 수행합니다.
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // console.log('선택한 파일:', file);
      // 여기에서 파일을 처리하거나 업로드를 수행합니다.
    }
  };

  const openBrowser = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  useEffect(() => {
    if (selectedFile) {
      console.log("선택한 파일명:", selectedFile.name);
    }
  }, [selectedFile])

  return (
    <div
      css={isDragging ? dragOverStyle : uploadBoxStyle}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type='file' accept=".zip" ref={inputFileRef} style={{display: 'none'}} onChange={handleFileChange}/>
      {selectedFile === null ? 
        <>
          <FileUploadOutlinedIcon color="disabled" />
          <Button onClick={openBrowser}>파일 선택</Button>
        </> :
        <>
          {selectedFile !== null ? selectedFile.name : "올바르지 못한 파일입니다"}
        </>
      }
    </div>
  )
}

const uploadBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  border: 2px dashed gray;
`

const dragOverStyle = css`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  border: 2px dashed black;
`

export default DragAndDrop