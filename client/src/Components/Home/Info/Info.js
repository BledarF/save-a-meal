function Info() {
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
          <div className="pie-wrapper flex flex-row items-center justify-evenly p-5 my-10"></div>
        </div>
      </div>
    </section>
  );
}
export default Info;
