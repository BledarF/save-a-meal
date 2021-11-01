import { useEffect, useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import "./SearchPage.css";

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const pret = {
      imgUrl:
        "https://135525-391882-2-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/03/Pret-a-Manger-1280x849.png",
      name: "Pret A Manger",
      address: {
        streetName: "13 fufun road",
        town: "Old Street",
        postCode: "w3 9lt",
      },
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
      address: {
        streetName: "54 eruign road",
        town: "Shoreditch",
        postCode: "ub77eq",
      },
      times: "1pm-3pm",
      distance: "1.3km",
      logoUrl:
        "https://i.pinimg.com/originals/cb/c4/e1/cbc4e1be6e072d6ec20c2306ee823d56.png",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const mcd = {
      imgUrl:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/57B6/production/_120445422_mcdonaldsplantburger.jpg",
      name: "MC Donald's",
      address: { streetName: "", town: "Canary Wharf", postCode: "" },
      times: "8pm-11pm",
      distance: "9km",
      logoUrl:
        "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const auntiAnnes = {
      imgUrl:
        "https://www.thespruceeats.com/thmb/Za90jp6reRFqa2zw_1atvjhquCw=/1500x1000/filters:fill(auto,1)/auntieannespretzels-final-f94ebd828d444a328b24796f95856cc4.jpg",
      name: "Auntie Anne's",
      address: {
        streetName: "199 street lane",
        town: "Liverpool Street",
        postCode: "w1 2hb",
      },
      times: "9am-11am",
      distance: "2km",
      logoUrl:
        "https://www.auntieannes.co.uk/wp-content/uploads/2021/04/AA-Fav-icon-transparent-80.jpg",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    const kfc = {
      imgUrl:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2018/08/kfc-menu.jpg?quality=82&strip=1&resize=640%2C360",
      name: "KFC",
      address: {
        streetName: "911 kfc streetroad",
        town: "Liverpool Street",
        postCode: "m0 7oq",
      },
      times: "12am - 1am",
      distance: "2 km",
      logoUrl:
        "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
      description:
        "we give only food no drinks or coffee, including fruits, salad bowls, sandwiches etc",
      rating: "5",
      slots: 5,
    };
    setRestaurants([pret, costa, mcd, auntiAnnes, kfc]);
  }, []);

  return (
    <div className="search-page-wrapper flex flex-col">
      <div className="pt-10 flex items-center justify-center">
        <SearchBar setRestaurants={setRestaurants} />
      </div>
      <div className="flex flex-row">
        <Results restaurants={restaurants} />
      </div>
    </div>
  );
}

export default SearchPage;
