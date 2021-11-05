import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faHandPointer,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import InstructionsCard from "./InstructionsCard";

function Instructions() {
  return (
    <section className="instructions-section flex items-center justify-center">
      <div className="instructions-wrapper flex flex-col items-center justify-center w-1/2">
        <h1 className="text-yellow-500 text-base">Instructions</h1>
        <h1 className="font-weight-bolder text-5xl">How it works</h1>

        <h1 className="text-base w-2/3 self-center mt-4">
          We have created an intuitive system for customers to place orders. For
          the fair allocation of food, each customer is limited to one order
          each day. We cannot guarantee what exactly the restaurant will give
          you but it will be equivalent to one meal worth of food, or more.
        </h1>
        <div className="instruction-card-wrapper grid grid-cols-3 gap-14">
          <InstructionsCard
            icon={faHamburger}
            title={"Pick a meal"}
            desc={
              "Use the Search page to find participating local restaurants."
            }
          />
          <InstructionsCard
            icon={faHandPointer}
            title={"Place order"}
            desc={"Place the order. You can only make one daily order."}
          />
          <InstructionsCard
            icon={faStoreAlt}
            title={"Collect"}
            desc={"Bring your ID to the store during the allocated time."}
          />
        </div>
      </div>
    </section>
  );
}
export default Instructions;
