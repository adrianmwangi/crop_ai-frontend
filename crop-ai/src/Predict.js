import React, { useCallback, useRef, useState } from "react";
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
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import { Grid, Typography } from "@mui/material";
import NavBar from "./components/Navbar";
import PlantResults from "./PlantResults";

export default function Predict() {
  const [selectedImages, setSelectedImages] = useState([]);
  const captionRef = useRef(null);
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
    <div>
      <NavBar typeOfBar="mainNav" />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Grid item width="30%" sx={{}}>
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div
                  style={{
                    border: "5px dashed black",
                    borderRadius: "10%",
                    paddingBottom: "15em",
                    paddingTop: "10em",
                    color: "#000000",
                    background: "#ffffff",
                    opacity: "90%",
                  }}
                >
                  <h3
                    style={{
                      padding: "1.3em",
                      fontSize: "1.5rem",
                    }}
                  >
                    Drop the files here ...
                  </h3>
                </div>
              ) : (
                <div
                  style={{
                    border: "5px dashed black",
                    borderRadius: "10%",
                    paddingBottom: "15em",
                    paddingTop: "10em",
                    color: "#000000",
                    background: "#ffffff",
                    opacity: "70%",
                  }}
                >
                  <h3
                    style={{
                      padding: "1.3em",
                      fontSize: "1.5rem",
                    }}
                  >
                    Drag 'n' drop some files here, or click to select files
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FileUploadOutlinedIcon fontSize="large" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            padding: "2em",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#ffffff",

              padding: "1em",
            }}
          >
            Upload a picture of a crop to get more info
          </Typography>
          <div className="predict_btn">
            <PlantResults />
          </div>
        </Grid>
        <Grid item xs={2} sx={{ border: "2px solid red" }}>
          {selected_image}
        </Grid>
        <Grid item lg={2} sx={{}}>
          <input ref={captionRef} type="text" placeholder="Enter cap" />
          <button onClick={uploadPost}>send</button>
        </Grid>
      </Grid>
    </div>
  );
}
