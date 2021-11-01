import { useEffect, useContext, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import RestaurantModal from "./RestaurantModal/RestaurantModal";

function Results(props) {
	const [showModal, setShowModal] = useState(false);
	const [modalDetails, setModalDetails] = useState({});
	const { restaurants, bookingStatus } = props;
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
		<main className="results-wrapper grid grid-cols-4 gap-4 p-2">
			{getRestaurants()}
			{showModal && (
				<RestaurantModal
					restaurantDetails={modalDetails}
					setShowModal={setShowModal}
					bookingStatus={bookingStatus}
					setBookingStatus={setBookingStatus}
				/>
			)}
		</main>
	);
}

export default Results;
