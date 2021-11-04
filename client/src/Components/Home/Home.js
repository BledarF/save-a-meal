import { useEffect, useState } from "react";
import "./Home.css";
import adnanPhoto from "./TeamPhotos/Adnan.jpg";
import sohailPhoto from "./TeamPhotos/Sohail.jpg";
import bledarPhoto from "./TeamPhotos/Bledar.jpg";
import gpPhoto from "./TeamPhotos/Gurpratap.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faHandPointer,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
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
            From your favorite shops and restaurants.
          </h1>
        </div>
      </section>
    );
  };
  const getQuickFact = function getQuickFactListComponent(mainTxt, subtext) {
    return (
      <li className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold mb-7 w-2/5">{mainTxt}</h1>
        <p className="text-lg">{subtext}</p>
      </li>
    );
  };
  const infoSection = function getInfoSectionComponent() {
    return (
      <section className="info-section flex justify-start items-start">
        <div className="info flex justify-end items-start">
          <div className="flex flex-col self-end justify-center align-middle p-2 w-1/2 text-left text-black">

            <h1 className="text-5xl font-extrabold mb-14">Our mission</h1>

            <p className="info-text w-2/3 mb-10">
              Every day, thousands of restaurants, cafes, supermarkets and other
              institutions throw away huge amounts of edible food. This is a
              massive loss for businesses - as they are throwing away stock that
              they could make money from. It is also a massive loss for people
              too, especially as poverty and food prices are on the rise.
            </p>
            <p className="info-text w-2/3 mb-10">
              Our aim is to connect businesses and individuals who would like to
              tackle the issue of food waste. We have built a system where
              businesses can sign up and customers can order from them.
            </p>
            {/* <ul className="list-none flex justify-between items-center text-center w-2/3">
              {getQuickFact("1/3", "of food is wasted")}
              {getQuickFact("6.9", "businesses reducing their food waste")}
              {getQuickFact("7.4", "million Magic Bags rescued so far")}
            </ul> */}
            <div className="pie-wrapper flex flex-row items-center justify-evenly p-5 my-10"></div>
          </div>
        </div>
      </section>
    );
  };
  const instructionsCard = function getInstructionsCardComponent(
    icon,
    title,
    desc
  ) {
    return (
      <div className="relative flex flex-col justify-evenly items-center h-80 rounded-3xl cursor-pointer my-5 shadow-lg p-3">
        {<FontAwesomeIcon icon={icon} size="3x" style={{ color: "#F59E0B" }} />}
        <h1 className="text-2xl">{title}</h1>
        <h1 className="text-base">{desc}</h1>
      </div>
    );
  };
  const instructions = function getInstructionsSectionComponent() {
    return (
      <section className="instructions-section flex items-center justify-center">
        <div className="instructions-wrapper flex flex-col items-center justify-center w-1/2">
          <img src="" alt="" />
          <h1 className="text-yellow-500 text-base">Instructions</h1>
          <h1 className="font-weight-bolder text-5xl">How it works</h1>

          <h1 className="text-base w-2/3 self-center mt-4">
            We have created an intuitive system for customers to place orders.
            For the fair allocation of food, each customer is limited to one
            order each day. We cannot guarantee what exactly the restaurant will
            give you but it will be equivalent to one meal worth of food, or
            more.
          </h1>
          <div className="instruction-card-wrapper grid grid-cols-3 gap-14">
            {instructionsCard(
              faHamburger,
              "Pick a meal",
              "Use the Search page to find participating local restaurants."
            )}
            {instructionsCard(
              faHandPointer,
              "Place order",
              "Place the order. You can only make one daily order."
            )}
            {instructionsCard(
              faStoreAlt,
              "Collect",
              "Bring your ID to the store during the allocated time."
            )}
          </div>
        </div>
      </section>
    );
  };
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
      {infoSection()}
      {instructions()}
      {aboutSection()}
    </div>
  );
}

export default Home;
