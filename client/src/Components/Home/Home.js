import { useEffect, useState } from "react";
import "./Home.css";
import adnanPhoto from "./TeamPhotos/Adnan.jpg";
import sohailPhoto from "./TeamPhotos/Sohail.jpg";
import bledarPhoto from "./TeamPhotos/Bledar.jpg";
import gpPhoto from "./TeamPhotos/Gurpratap.jpg";
import logo from "./images/goodlogo.png";
import pie from "./images/piechart.png";
import kute from "kute.js";
import kuteMin from "kute.js";

function Home() {
  const tween = kute.fromTo(
    ".blob1",
    { path: ".blob1" },
    { path: ".blob1" },
    { repeat: 999, duration: 3000, yoyo: true }
  );
  tween.start();
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
          <rect x="0" y="0" width="900" height="600" fill="#ffffff"></rect>
          <defs>
            <linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
              <stop offset="20%" stop-color="#ffffff" stop-opacity="1"></stop>
              <stop offset="80%" stop-color="#ffffff" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
              <stop offset="20%" stop-color="#ffffff" stop-opacity="1"></stop>
              <stop offset="80%" stop-color="#ffffff" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
          <g transform="translate(900, 0)">
            <path
              d="M0 486.7C-49 444.3 -98 401.8 -159.2 384.3C-220.4 366.8 -293.9 374.3 -344.2 344.2C-394.5 314.1 -421.7 246.5 -441.6 182.9C-461.5 119.3 -474.1 59.7 -486.7 0L0 0Z"
              fill="#F7770F"
            ></path>
          </g>
          <g transform="translate(0, 600)">
            <path
              d="M0 -486.7C65.7 -481.5 131.4 -476.2 186.3 -449.7C241.2 -423.2 285.3 -375.6 329.5 -329.5C373.8 -283.4 418.2 -238.7 444.4 -184.1C470.6 -129.4 478.7 -64.7 486.7 0L0 0Z"
              fill="#F7770F"
            ></path>
          </g>
          <g transform="translate(900, 0)">
            <path
              d="M0 486.7C-70.5 487 -141.1 487.3 -186.3 449.7C-231.5 412.1 -251.4 336.8 -287.1 287.1C-322.8 237.4 -374.3 213.5 -410.2 169.9C-446.1 126.4 -466.4 63.2 -486.7 0L0 0Z"
              fill="#F7770F"
            ></path>
          </g>
          <g transform="translate(0, 600)">
            <path
              d="M0 -486.7C48.5 -437.2 97 -387.7 150.8 -364C204.6 -340.3 263.7 -342.4 318.2 -318.2C372.6 -294 422.4 -243.7 449.7 -186.3C477 -128.9 481.9 -64.4 486.7 0L0 0Z"
              fill="#F7770F"
            ></path>
          </g>
          <g transform="translate(900, 0)">
            <path
              d="M0 486.7C-65.2 481.7 -130.3 476.6 -186.3 449.7C-242.2 422.8 -288.9 374.2 -324.6 324.6C-360.3 274.9 -385 224.2 -410.2 169.9C-435.4 115.6 -461.1 57.8 -486.7 0L0 0Z"
              fill="#F7770F"
            ></path>
          </g>
          <g transform="translate(0, 600)">
            <path
              d="M0 -486.7C70.2 -487.3 140.4 -487.8 186.3 -449.7C232.2 -411.6 253.8 -334.9 282.1 -282.1C310.4 -229.4 345.4 -200.7 380.6 -157.7C415.9 -114.6 451.3 -57.3 486.7 0L0 0Z"
              fill="#F7770F"
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
