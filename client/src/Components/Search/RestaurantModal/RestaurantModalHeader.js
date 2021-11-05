function RestaurantModalHeader(props) {
  const { logo, name, town } = props.headerDetails;
  const { setShowModal } = props;

  return (
    <div className="flex items-center p-3 justify-between border-b border-solid border-blueGray-200 rounded-t">
      <img className=" h-20" src={logo} alt={`${name} Logo`} />
      <h3 className="text-2xl font-semibold">
        {name} - {town}
      </h3>
      <button
        className=""
        onClick={() => {
          setShowModal(false);
        }}
      >
        <span className="bg-transparent text-red-600 opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none mr-3">
          &#10006;
        </span>
      </button>
    </div>
  );
}

export default RestaurantModalHeader;
