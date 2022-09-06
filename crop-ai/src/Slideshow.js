import React from "react";
import { Slide } from "react-slideshow-image";
import slide from "./assets/images/slide.jpg";
import slide1 from "./assets/images/slide1.jpg";
import slide2 from "./assets/images/slide2.jpg";
import slide3 from "./assets/images/slide3.jpg";
import slide4 from "./assets/images/slide4.jpg";
import slide5 from "./assets/images/slide5.jpg";
import slide6 from "./assets/images/slide6.jpg";
import slide7 from "./assets/images/slide7.jpg";
import slide8 from "./assets/images/slide8.jpg";
import slide9 from "./assets/images/slide9.jpg";
import slide10 from "./assets/images/slide10.jpg";
import slide11 from "./assets/images/slide11.jpg";
import slide12 from "./assets/images/slide12.jpg";
import slide13 from "./assets/images/slide13.jpg";
import slide14 from "./assets/images/slide14.jpg";

import "react-slideshow-image/dist/styles.css";
import "./slide.css";

export default function Slideshow() {
  const slideImages = [
    slide,
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10,
    slide11,
    slide12,
    slide13,
    slide14,
  ];

  const properties = {
    duration: 1800,
    transitionDuration: 700,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    // onChange: (oldIndex, newIndex) => {
    //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    // },
  };

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div>
              <img key={index} style={{ width: "100%" }} src={slideImage} />
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
