import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  Grid,
  Alert,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useDropzone } from "react-dropzone";
import { db, storage } from "./firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import PlantResults from "./PlantResults";
import NavBar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./userDash.css";

export default function UserDash() {
  const [selectedImages, setSelectedImages] = useState([]);
  const captionRef = useRef(null);

  window.location.replace('http://127.0.0.1:5000/');
  

  //function to upload through click
  const uploadPost = async () => {
    const docRef = await addDoc(collection(db, "upload"), {
      //creating firestore data structure
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    await Promise.all(
      selectedImages.map((image) => {
        //create images path
        const imageRef = ref(storage, `upload/${docRef.id}/${image.path}`);
        uploadBytes(imageRef, image, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "upload", docRef.id), {
            image: arrayUnion(downloadURL),
          });
        });
      })
    );
    captionRef.current.value = "";
    setSelectedImages([]);
    console.log("uploaded!");
  };

  //function to handle drop activity
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const selected_image = selectedImages.map((file) => (
    <div>
      <img src={file.preview} style={{ width: "200px" }} alt="" />
    </div>
  ));

  return (
    <>
      <a href="http://127.0.0.1:5000/" target="_blank" rel="noreferrer"></a>
    </>
  );
}
