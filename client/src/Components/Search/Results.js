import { useEffect, useContext, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import RestaurantModal from "./RestaurantModal/RestaurantModal";

function Results() {
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  useEffect(() => {
    const pret = {
      imgUrl:
        "https://135525-391882-2-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/03/Pret-a-Manger-1280x849.png",
      name: "Pret A Manger",
      town: "Old Street",
      times: "5pm-7pm",
      distance: "0.6km",
      logoUrl:
        "https://i.pinimg.com/originals/12/1a/e0/121ae05c213b2c37522e7fde2f4d8263.jpg",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const costa = {
      imgUrl:
        "https://images.ctfassets.net/royi30b2qd26/oA2PCvC6o6KIvT4DSPMnM/aa7356717f12a9466d10caeaf0368963/our-coffees-sept-21-takeaway-CO4314-696x512.jpg?w=700&q=100",
      name: "Costa Coffee",
      town: "Shoreditch",
      times: "1pm-3pm",
      distance: "1.3km",
      logo: "",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const mcd = {
      imgUrl:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/57B6/production/_120445422_mcdonaldsplantburger.jpg",
      name: "MC Donald's",
      town: "Canary Wharf",
      times: "8pm-11pm",
      distance: "9km",
      logo: "",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const antiannes = {
      imgUrl:
        "https://www.thespruceeats.com/thmb/Za90jp6reRFqa2zw_1atvjhquCw=/1500x1000/filters:fill(auto,1)/auntieannespretzels-final-f94ebd828d444a328b24796f95856cc4.jpg",
      name: "Auntie Anne's",
      town: "Liverpool Street",
      times: "9am-11am",
      distance: "2km",
      logo: "",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    setRestaurants([pret, costa, mcd, antiannes]);
  }, []);

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
        />
      )}
    </main>
  );
}

export default Results;
