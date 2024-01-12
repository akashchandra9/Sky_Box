import React, { useEffect, useContext, useState } from "react";
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import axios from 'axios'
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./UserContext";
import './pro.css'
const Detail = () => {
  useEffect(() => {
    fetch(process.env.React_App_Host_Api+"/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const email =userInfo.email;  
  const [uploadProgress, setUploadProgress] = useState(0);

var user = {
  email:email
}
    const [selectedFile, setSelectedFile] = useState([]);
    const handleFileUpload = () => {
      const formData = new FormData();
      selectedFile.forEach((file2)=>{
        formData.append('file',file2)
      })
  axios.post(process.env.React_App_Host_Api+'/api/upload/user',user);
      axios
        .post(process.env.React_App_Host_Api+'/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        })
        .then(res => {
          toast.success(res.data);
          setUploadProgress(0);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      const filePreviews = selectedFile.map((file, index) => (
        <div key={index}>
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: '200px' }}
            />
          ) : (
            <p>{file.name}</p>
          )}
        </div>
      ));

return (
	<>
  <p>{email}</p>
		
    <div className='dropzone'>
      <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps({multiple:true}) }/>
            <p>Drag and drop a file here, or click to select a file</p>
          </div>
          
        )}
      </Dropzone>
      <button onClick={handleFileUpload}>Upload File</button>
      {uploadProgress > 0 && (
          <div className='progress-bar' style={{ width: `${uploadProgress}%` }}>
            {uploadProgress}%
          </div>
        )}
     
    </div>
    {filePreviews}

  
<ToastContainer/>
	</>
)
};

export default Detail;
