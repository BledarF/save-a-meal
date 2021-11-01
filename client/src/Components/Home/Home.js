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
        <svg
          id="visual"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          href="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g transform="translate(427.21248616730395 269.7703740438364)">
            <path
              id="blob1"
              d="M127.9 -126.5C165.7 -90 196.4 -45 195.5 -0.8C194.7 43.4 162.4 86.7 124.6 136.7C86.7 186.7 43.4 243.4 -3.7 247C-50.7 250.7 -101.4 201.4 -127 151.4C-152.7 101.4 -153.3 50.7 -145.7 7.7C-138 -35.4 -122 -70.7 -96.4 -107.2C-70.7 -143.7 -35.4 -181.4 4.8 -186.2C45 -191 90 -163 127.9 -126.5"
              fill="#f59e0b"
            ></path>
          </g>
          <g transform="translate(424.9189619473403 250.36553952841274)">
            <path
              id="blob2"
              d="M145.3 -137.7C178 -112.7 187 -56.3 190.9 3.9C194.8 64.1 193.6 128.2 160.9 178.2C128.2 228.2 64.1 264.1 11.5 252.6C-41 241 -82 182 -107.4 132C-132.7 82 -142.3 41 -142.3 0C-142.3 -41 -132.7 -82 -107.4 -107C-82 -132 -41 -141 7.7 -148.7C56.3 -156.3 112.7 -162.7 145.3 -137.7"
              fill="#f59e0b"
            ></path>
          </g>
          <g transform="translate(458.06821237752877 336.3914018331879)">
            <path
              id="blob3"
              d="M141.4 -156.4C176.2 -106.5 192.6 -53.3 201.1 8.5C209.6 70.2 210.1 140.5 175.3 165.5C140.5 190.5 70.2 170.2 -0.2 170.5C-70.7 170.7 -141.4 191.4 -180.8 166.4C-220.1 141.4 -228 70.7 -218.3 9.8C-208.5 -51.1 -181 -102.3 -141.6 -152.1C-102.3 -202 -51.1 -250.5 1.1 -251.5C53.3 -252.6 106.5 -206.2 141.4 -156.4"
              fill="#f59e0b"
            ></path>
          </g>
          <g transform="translate(446.0082590395294 246.78785795266072)">
            <path
              id="blob4"
              d="M136.2 -128.7C168.7 -103.7 181.9 -51.9 189.9 8C197.9 67.9 200.8 135.8 168.3 185.8C135.8 235.8 67.9 267.9 12.4 255.5C-43.1 243.1 -86.3 186.3 -121.1 136.3C-155.9 86.3 -182.5 43.1 -186.6 -4.1C-190.7 -51.4 -172.4 -102.8 -137.6 -127.8C-102.8 -152.8 -51.4 -151.4 0.2 -151.6C51.9 -151.9 103.7 -153.7 136.2 -128.7"
              fill="#f59e0b"
            ></path>
          </g>
          <g transform="translate(404.7197388407874 294.66388918226505)">
            <path
              id="blob5"
              d="M171.6 -146.6C221.6 -121.6 260.8 -60.8 260.8 0C260.8 60.8 221.6 121.6 171.6 150C121.6 178.3 60.8 174.1 5.1 169.1C-50.7 164 -101.4 158 -132 129.7C-162.7 101.4 -173.3 50.7 -169.5 3.9C-165.6 -42.9 -147.1 -85.8 -116.5 -110.8C-85.8 -135.8 -42.9 -142.9 9 -151.9C60.8 -160.8 121.6 -171.6 171.6 -146.6"
              fill="#f59e0b"
            ></path>
          </g>
        </svg>
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
