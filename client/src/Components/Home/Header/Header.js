function Header() {
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
}

export default Header;
