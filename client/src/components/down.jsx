import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
import fileDownload from 'js-file-download';
import './file2.css';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./UserContext";
import './pro.css';

const Down = () => {
  useEffect(() => {
    fetch(process.env.React_App_Host_Api + "/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const email = userInfo.email;
  const [download, setDow] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  function handleDownload() {
    if (download === '') {
      toast.error("Please write file name");
    } else {
      const user = {
        download: download,
        email: email
      };

      fetch(process.env.React_App_Host_Api + '/api/down', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('File not found');
          }
        })
        .then(blobData => {
          toast.success('Success');
          fileDownload(blobData, download);
          setDownloadProgress(0);
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('File not found');
        });
    }
  }

  function show() {
    var user = {
      email: email,
    };

    axios.post(process.env.React_App_Host_Api + '/api/files', user)
      .then((response) => {
        const files = response.data;

        if (files.length === 0) {
          toast.error("No files found");
        }

        setFiles(files);
      })
      .catch(() => {
        toast.error("An error occurred while fetching files");
      });
  }

  function dow(file) {
    setDow(file);
  }

  function del() {
    if (download === '') {
      toast.error("Please write file name");
    } else {
      var user = {
        download: download,
        email: email
      };
      axios.post(process.env.React_App_Host_Api + '/api/delete', user).then((res) => {
        toast.success("Deleted");
        show();
      }).catch((err) => {
        toast.error("File not found and not deleted");
      });
    }
  }

  function del2(file) {
    var user = {
      download: file,
      email: email
    };
    axios.post(process.env.React_App_Host_Api + '/api/delete', user).then((res) => {
      toast.success("Deleted");
      show();
    }).catch((err) => {
      toast.error("File not found and not deleted");
    });
  }

  function dow2(file) {
    if (download === '') {
      toast.error("Please write file name");
    } else {
      var user = {
        download: download,
        email: email
      };
      axios.post(process.env.React_App_Host_Api + '/api/down', user, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setDownloadProgress(progress);
        },
      })
        .then((res) => {
          toast.success('Success');
          fileDownload(res.data, download);
          setDownloadProgress(0);
        })
        .catch(() => {
          toast.error("File not found");
        });
    }
  }

  function isImageFile(filename) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  }

  return (
    <>
    <p>{email}</p>
    <div className="down">
      <input
        className="inputdown"
        type='text'
        placeholder="Enter file name"
        value={download}
        onChange={(e) => { setDow(e.target.value) }}
      ></input>
      <br></br>
      <button className="download" onClick={handleDownload}>Download</button>
      <button className="show" onClick={show}>Show files:</button>
      <button className="delete" onClick={del}>Delete</button>
      {downloadProgress > 0 && (
        <div className='progress-bar' style={{ width: `${downloadProgress}%` }}>
          {downloadProgress}%
        </div>
      )}
      <ToastContainer />
      <div>
        <h1>Files Available:</h1>
        {files.map((file, index) => (
          <div key={index}>
            <h6>{file}</h6>
            <button onClick={() => dow(file)}>Download</button>
            <button onClick={() => del2(file)}>Delete</button>
            <button onClick={() => setPreviewFile(file)}>Preview</button>
          </div>
        ))}
      </div>
      {previewFile && (
        <div className="preview-section">
          {isImageFile(previewFile) ? (
            <img
              src={`${process.env.React_App_Host_Api}/api/files/${previewFile}`}
              alt="Preview"
              className="preview-image"
            />
          ) : (
            <video controls width="300">
              <source
                src={`${process.env.React_App_Host_Api}/api/files/${previewFile}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  </>
  )
}

export default Down;