import adnanPhoto from "../TeamPhotos/Adnan.jpg";
import sohailPhoto from "../TeamPhotos/Sohail.jpg";
import bledarPhoto from "../TeamPhotos/Bledar.jpg";
import gpPhoto from "../TeamPhotos/Gurpratap.jpg";
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
							desc: "Adnan is a recent MEng graduate from Imperial College London. He loves how coding brings people from all walks of life together.",
							img: adnanPhoto,
							github: "AdnanGondal",
							linkedin: "adnan-gondal-2021",
						}}
					/>
					<AboutCard
						cardDetails={{
							name: "Sohail the snail",
							role: "UI/UX, Front-End",
							desc: "You like what you see? Well, I copied it! Let me tell you a tale about a guy called sohail, he runs fast but his nickname is snail, expect him to randomely disappear without fail",
							img: sohailPhoto,
							github: "SohailSaiedi",
							linkedin: "sohailsaiedi",
						}}
					/>
					<AboutCard
						cardDetails={{
							name: "Bledar Ferati",
							role: "Architect/ Backend",
							desc: "Bledar is a recent BEng graduate from Warwick University. He has really yellow teeth.",
							img: bledarPhoto,
							github: "BladerF",
							linkedin: "bledar-f-aa2501138",
						}}
					/>
					<AboutCard
						cardDetails={{
							name: "Gurpartap Singh",
							role: "CTO/Backend",
							desc: "Gurpartap is a recent BEng graduate from Warwick University. He loves money.",
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
