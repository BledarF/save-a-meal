function RestaurantModalHeader(props) {
  let {
    streetname,
    postcode,
    imageUrl,
    startTime,
    endTime,
    description,
    slots,
    review,
  } = props.bodyDetails;
  startTime = startTime.slice(0, 5);
  endTime = endTime.slice(0, 5);

  return (
    <div>
      <div className="flex justify-center items-center pl-3">
        <img
          className="res-image max-w-1/2 max-h-80"
          src={imageUrl}
          alt="example of restaurant's food"
        />
        <div className="body-text-wrapper text-left flex justify-center items-start flex-col w-full h-full p-4">
          <div className="description-wrapper flex flex-col items-start justify-between text-xl w-full">
            <h3 className="text-xl">Description</h3>
            <p className="text-base">{description}</p>
          </div>
          <div className="upper-body-text flex items-start justify-between text-base w-full">
            <p className="">
              <span className="font-bold">Address: </span>
              {streetname}, {postcode}
            </p>
            <p className="ml-1 underline">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="rating-title-wrapper w-full flex flex-row justify-between text-xl">
            <p>
              {typeof review === Number ? Number(review).toFixed(2) : review}
            </p>
          </div>
          <h3 className="text-xl mr-3">Slots Available: {slots}</h3>
        </div>
      </div>
    </div>
  );
}

export default RestaurantModalHeader;
