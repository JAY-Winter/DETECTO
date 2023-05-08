import { Button, CircularProgress, TextField } from '@mui/material';
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import DragAndDrop from './DragAndDrop';
import useAxios from '@/hooks/useAxios';
import { RequestObj } from 'AxiosRequest';


type EditEquipmentProps = {
  addItemHandler: (name: string, desc: string, img: string) => void,
  onClose: () => void
}

function EditEquipment({ addItemHandler, onClose }: EditEquipmentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentDesc, setEquipmentDesc] = useState("");
  const [isErrorName, setIsErrorName] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [data, isLoading, setRequestObj] = useAxios({baseURL: "https://detec.store:5000/"});

  const submit = () => {
    if (selectedZip === null) {
      alert("올바른 파일을 업로드 해주세요");
      return;
    } else if (equipmentName === "") {
      alert("장비명은 필수 입력란입니다");
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedZip);
    formData.append('img', selectedImage ?? "");
    formData.append('name', equipmentName);
    formData.append('description', equipmentName);

    // requestObj 생성
    const reqeusetObj: RequestObj = {
      url: 'upload',
      method: 'post',
      body: formData,
      headerObj: {
        'Content-Type': 'multipart/form-data'
      }
    }

    setRequestObj(reqeusetObj);
  }

  const handleNameinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    if (name === "") {
      setIsErrorName(true);
      setErrorMessage("장비명을 입력해주세요");
      setIsValid(false);
    } else if (name.length > 20) {
      setIsErrorName(true);
      setErrorMessage("장비명은 20자 이하로 입력해주세요");
      setIsValid(false);
    } else {
      setIsErrorName(false);
      setErrorMessage("");
    }
    setEquipmentName(name);
  }

  const handleDescinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquipmentDesc(e.target.value);
  }

  useEffect(() => {
    if (selectedZip !== null && equipmentName.trim() !== "") {
      setIsValid(true);
    }
  }, [equipmentName, selectedZip])
  
  useEffect(() => {
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageURL = e.target?.result as string ?? "";
        setImageSrc(imageURL);
      }
      reader.readAsDataURL(selectedImage);
    } else {
      setImageSrc(null);
    }
  }, [selectedImage])

  useEffect(() => {
    if (isLoading === false && data !== null) {
      console.log("업로드 완료!");
      if (imageSrc !== null) {
        addItemHandler(equipmentName, equipmentDesc, imageSrc);
      }
      onClose();
    }
  }, [data, isLoading])

  return (
    <EditEquipmentForm>
      <div>
        <DragAndDrop isDragging={isDragging} setIsDragging={setIsDragging} selectedFile={selectedZip} setSelectedFile={setSelectedZip} type='zip' />
        <br />
        <DragAndDrop isDragging={isDragging} setIsDragging={setIsDragging} selectedFile={selectedImage} setSelectedFile={setSelectedImage} type='image' />
        <TextField fullWidth label="장비명(공백제외 최대 20자)" value={equipmentName} variant="standard" onChange={handleNameinput} margin="normal" error={isErrorName} helperText={errorMessage} />
        <TextField fullWidth label="장비 설명(선택)" value={equipmentDesc} variant="standard" onChange={handleDescinput} />
      </div>
      <Button fullWidth variant="contained" onClick={submit} disabled={!isValid || isLoading}>
        {isLoading ?
          <CircularProgress size="1.7rem"/> :
          "등록하기"
        }
      </Button>
    </EditEquipmentForm>
  )
}

const EditEquipmentForm = styled.form`
  width: 500px;
  height: 800px;
  background-color: ${props => props.theme.palette.neutral.main};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default EditEquipment