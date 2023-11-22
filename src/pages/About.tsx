import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/pao.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Hi, I am Alex Almeida</h1>
      <h2 className="profile-text">Web Developer</h2>
      <h4 className="profile-text">
        This project was created for an assignment in my course.
      </h4>

      <div className="profile-links">
        <a href="https://github.com/ySunSh1ne">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/ySunshine/">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(About);
