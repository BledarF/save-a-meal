import { useEffect, useState } from "react";
import "./Home.css";
import adnanPhoto from "./TeamPhotos/Adnan.jpg";
import sohailPhoto from "./TeamPhotos/Sohail.jpg";
import bledarPhoto from "./TeamPhotos/Bledar.jpg";
import gpPhoto from "./TeamPhotos/Gurpratap.jpg";
import logo from "./images/goodlogo.png";
import pie from "./images/piechart.png";

function Home() {
  const teamImageComponent = function getTeamImageComponent(
    title,
    desc,
    image
  ) {
    return (
      <figure className="relative max-w-xs cursor-pointer my-5">
        <img
          className="rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          src={image}
          alt={title}
        />
        <figcaption className="absolute text-left -mt-16 text-white px-3">
          <h1 className="text-2xl m-0">{title}</h1>
          <h1 className="text-base m-0">{desc}</h1>
        </figcaption>
      </figure>
    );
  };

  const headerSection = function getHeaderComponent() {
    return (
      <section className="header flex flex-row items-center justify-center">
        <div className="header-wrapper flex flex-col justify-center items-center">
          <img src={logo} alt="mainImage" className="mb-10 w-2/5" />
          <h1 className="w-1/2 text-5xl text-yellow-500 font-extrabold">
            WE ARE BASICALLY FOOD HEROES BUT WORSE
          </h1>
        </div>
      </section>
    );
  };

  const getQuickFact = function getQuickFactListComponent(mainTxt, subtext) {
    return (
      <li className="flex flex-col justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-7 w-2/5">{mainTxt}</h1>
        <p>{subtext}</p>
      </li>
    );
  };

  const infoSection = function getInfoSectionComponent() {
    return (
      <section className="info-section">
        <div className="info flex justify-center align-middle">
          <div className="flex flex-col justify-center align-middle p-2 text-left text-yellow-500">
            <h1 className="text-6xl font-extrabold mb-7">
              RESCUE MAGIC BAGS OF SURPLUS, UNSOLD FOOD
            </h1>
            <h3 className="text-4xl font-extrabold mb-7">
              FROM YOUR FAVOURITE SHOPS AND RESTAURANTS
            </h3>
            <p className="info-text">
              Every day, delicious, fresh food goes to waste at cafes,
              restaurants, hotels, shops and manufacturers - just because it
              hasn’t sold in time. The Save A Meal app lets you buy and collect
              this food - at a great price - so it gets eaten instead of wasted.
              You won’t know exactly what’s in your order until you pick it up -
              it’s all part of the surprise. Download the app to get started.
            </p>
            <div className="pie-wrapper flex flex-row items-center justify-evenly p-5 my-10">
              <img src={pie} alt="mainImage" className="w-2/6" />
              <h1 className="text-5xl font-extrabold mb-7 w-2/5">
                MORE THAN 1/3 OF FOOD IS WASTED
              </h1>
            </div>
            <ul className="list-none flex flex-row justify-between items-center text-center">
              {getQuickFact(
                "15,847",
                "million people finding and saving delicious food"
              )}
              {getQuickFact("6.9", "businesses reducing their food waste")}
              {getQuickFact("7.4", "million Magic Bags rescued so far")}
            </ul>
            <div className="pie-wrapper flex flex-row items-center justify-evenly p-5 my-10"></div>
          </div>
        </div>
      </section>
    );
  };

  const aboutSection = function getAboutSectionComponent(params) {
    return (
      <section className="about">
        <div className="header-wrapper flex flex-col">
          <h1 className="">The Team</h1>
          <div className="team-photo-wrapper flex flex-row flex-wrap justify-evenly align-middle">
            {teamImageComponent(
              "Adnan Gondal",
              "Project Manager / CEO / Founder",
              adnanPhoto
            )}
            {teamImageComponent(
              "Sohail Saiedi",
              "Team Motivator / Designer / QA",
              sohailPhoto
            )}
            {teamImageComponent(
              "Bledar",
              "Database Architect / Backend Dev",
              bledarPhoto
            )}
            {teamImageComponent("Gurpartap", "CT1", gpPhoto)}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="text-2xl">
      {headerSection()}
      {/* <div className="spacer layer1"></div> */}
      {infoSection()}
      {/* <div className="spacer layer2"></div> */}
      {aboutSection()}
    </div>
  );
}

export default Home;
