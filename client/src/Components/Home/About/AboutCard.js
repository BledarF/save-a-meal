import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const socialMediaComponent = function getSocialMediaComponent(icon) {
  return (
    <li>
      <a
        href="https://www.instagram.com"
        className="flex items-center justify-center h-8 w-8 border rounded-full text-yellow-500 border-yellow-500"
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </li>
  );
};

function AboutCard(props) {
  const { img, name, desc, role, github, linkedin } = props.cardDetails;
  return (
    <div className="about-card-component w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flefx-col md:flex-row shadow-2xl ">
      <div className="w-full md:w-2/5 h-80 overflow-hidden">
        <img
          className="about-card-image object-center object-cover w-full h-full"
          src={img}
          alt={`professional headshot of ${name}`}
        />
      </div>
      <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
        <p className="text-xl text-gray-700 font-bold">{name}</p>
        <p className="text-base text-gray-400 font-normal">{role}</p>
        <p className="text-base leading-relaxed text-gray-500 font-normal">
          {desc}
        </p>
        <div className="flex justify-start space-x-2">
          <a href={`https://www.github.com/${github}`}>
            <FontAwesomeIcon icon={faGithub} className="text-yellow-500" />
          </a>
          <a href={`https://www.linkedin.com/in/${linkedin}`}>
            <FontAwesomeIcon icon={faLinkedinIn} className="text-yellow-500" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
