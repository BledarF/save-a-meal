import { useEffect, useState } from "react";
import "./Home.css";
import adnanPhoto from "./TeamPhotos/Adnan.jpg";
import sohailPhoto from "./TeamPhotos/Sohail.jpg";
import bledarPhoto from "./TeamPhotos/Bledar.jpg";
import gpPhoto from "./TeamPhotos/Gurpratap.jpg";

function Home() {
  return (
    <div className="text-2xl">
      <section className="header flex flex-row items-center justify-center">
        <div className=" header-wrapper flex flex-row justify-center items-center p-5">
          <img
            src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            alt="mainImage"
            className="w-2/5 h-2/5"
          />
          <h1 className="w-1/3 p-1 text-5xl text-white font-extrabold  ml-10">
            WE ARE BASICALLY FOOD HEROES BUT WORSE
          </h1>
        </div>
      </section>
      <section className="info flex justify-center align-middle">
        <div className="flex flex-col justify-center align-middle p-2">
          <h1>Joining Save A Meal</h1>
          <p className="info-text text-border border-black border-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          </p>
        </div>
      </section>
      <section className="about bg-gray-100">
        <div className="header-wrapper flex flex-col p-5">
          <h1 className="m-5">The Team</h1>
          <div className="team-photo-wrapper flex flex-row justify-evenly align-middle">
            <img src={adnanPhoto} alt="adnanPhoto" className="w-1/4 p-1" />
            <img src={sohailPhoto} alt="adnanPhoto" className="w-1/4 p-1" />
            <img src={gpPhoto} alt="adnanPhoto" className="w-1/4 p-1" />
            <img src={bledarPhoto} alt="adnanPhoto" className="w-1/4 p-1" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
