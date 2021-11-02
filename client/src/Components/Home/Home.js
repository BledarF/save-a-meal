import { useEffect, useState } from "react";
import "./Home.css";
import adnanPhoto from "./TeamPhotos/Adnan.jpg";
import sohailPhoto from "./TeamPhotos/Sohail.jpg";
import bledarPhoto from "./TeamPhotos/Bledar.jpg";
import gpPhoto from "./TeamPhotos/Gurpratap.jpg";
import logo from "./images/companylogo.png";
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
      <section className="header flex flex-row items-center justify-start">
        <div className="header-wrapper flex flex-col justify-center items-end h-full w-2/5">
          <h1 className="text-9xl font-bold text-yellow-500 w-header-text text-left">
            Hungry?
          </h1>
          <h1 className="text-7xl font-bold text-yellow-500 w-header-text text-left">
            Save. A. Meal.
          </h1>
          <h1 className="text-2xl font-bold text-black w-header-text text-left">
            Your favourite food collected hot & fresh
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
      <section className="info-section flex justify-start items-start">
        <div className="info flex justify-end items-start">
          <div className="flex flex-col self-end justify-center align-middle p-2 w-1/2 text-left text-black">
            <h1 className="text-base font-extrabold mb-7">Our Mission</h1>
            <h1 className="text-5xl font-extrabold mb-14">
              Become your local food hero
            </h1>
            <p className="info-text w-2/3 mb-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              quisquam sequi laboriosam veritatis assumenda in cumque
              dignissimos consequatur modi dolorem unde ex ab quibusdam veniam
              blanditiis perferendis rem incidunt asperiores minima quas eius
              necessitatibus id quaerat dolores. Libero, natus expedita.
            </p>
            <ul className="list-none flex flex-row justify-between items-center text-center w-2/3">
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
