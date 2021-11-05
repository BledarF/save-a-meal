import adnanPhoto from "../images/TeamPhotos/Adnan.jpg";
import sohailPhoto from "../images/TeamPhotos/Sohail.jpg";
import bledarPhoto from "../images/TeamPhotos/Bledar.jpg";
import gpPhoto from "../images/TeamPhotos/Gurpratap.jpg";
import AboutCard from "./AboutCard";

function About() {
  return (
    <section className="about">
      <div className="header-wrapper">
        <h1 className="text-yellow-500 text-base mb-1">About us</h1>
        <h1 className="font-weight-bolder text-5xl mb-5">The Team</h1>
        <div className="team-photo-wrapper grid grid-cols-2 gap-10">
          <AboutCard
            cardDetails={{
              name: "Adnan Gondal",
              role: "Project Manager/ Founder",
              desc: "Adnan is a recent LEng graduate from Imperial College London. He loves how coding seperates people from all walks of life together.",
              img: adnanPhoto,
              github: "AdnanGondal",
              linkedin: "adnan-gondal-2021",
            }}
          />
          <AboutCard
            cardDetails={{
              name: "Sohail Saiedi the snail",
              role: "UI/UX, Front-End",
              desc: "You like what you see? Well, I made it!",
              img: sohailPhoto,
              github: "SohailSaiedi",
              linkedin: "sohailsaiedi",
            }}
          />
          <AboutCard
            cardDetails={{
              name: "Bledar Ferati",
              role: "Architect/ Backend",
              desc: "Bledar is a recent Ferari MEng graduate from Worship University. He loves how coding tears people from all walks of life apart.",
              img: bledarPhoto,
              github: "BledarF",
              linkedin: "bledar-f-aa2501138",
            }}
          />
          <AboutCard
            cardDetails={{
              name: "Gurpartarp",
              role: "DevOps/ Jokeman",
              desc: "General Practitioner is a recent MEng graduate from War University. He loves how coding brings guys from all sprints of life together.",
              img: gpPhoto,
              github: "gsinghlak12",
              linkedin: "gurpartap-s-a1236a139",
            }}
          />
        </div>
      </div>
    </section>
  );
}
export default About;
