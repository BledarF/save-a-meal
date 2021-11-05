import { text } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useContext, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import RestaurantModal from "./RestaurantModal/RestaurantModal";

function Results(props) {
	const [showModal, setShowModal] = useState(false);
	const [modalDetails, setModalDetails] = useState({});
	const { restaurants, bookingStatus, searchStatus } = props;
	const { setBookingStatus } = props;

	const getRestaurants = function getRestaurantsListAsComponents() {
		return restaurants.map((restaurant) => (
			<RestaurantCard
				details={restaurant}
				setShowModal={setShowModal}
				setModalDetails={setModalDetails}
			/>
		));
	};

	return (
		<div>
			{searchStatus === true ? (
				<main className="results-wrapper grid grid-cols-3 gap-4 p-2 items-stretch justify-items-stretch">
					{console.log("dwdwd")}
					{getRestaurants()}
					{showModal && (
						<RestaurantModal
							restaurantId={modalDetails.id}
							setShowModal={setShowModal}
							bookingStatus={bookingStatus}
							setBookingStatus={setBookingStatus}
						/>
					)}
				</main>
			) : searchStatus === false ? (
				<h2>The postcode you have entered is invalid.</h2>
			) : (
				""
			)}
		</div>
	);
}

export default Results;
