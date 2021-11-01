function RestaurantModalHeader(props) {
	let { streetname, postcode, imgUrl, startTime, endTime, description, slots } =
		props.bodyDetails;
	startTime = startTime.slice(0, 5);
	endTime = endTime.slice(0, 5);

	return (
		<div>
			<div className="flex justify-center flex-col items-center">
				<div className="upper-body-wrapper flex justify-start items-center flex-col w-4/5">
					<img
						className="image w-full"
						src={imgUrl}
						alt="example of restaurant's food"
					/>
					<div className="upper-body-text flex flex-col items-start justify-between text-base w-full">
						<div className="rating-title-wrapper w-full flex flex-row justify-between text-xl">
							<p>5*</p>
							<p className="">£4.59</p>
						</div>
						<p>
							Address {streetname}, {postcode}
						</p>
						<p>
							{startTime} - {endTime}
						</p>
					</div>
				</div>
				<div className="lower-body-wrapper text-left flex justify-start items-start flex-col w-full">
					<div className="description-wrapper flex flex-col items-start justify-between text-xl w-full">
						<h3 className="text-xl">Description</h3>
						<p className="text-base">{description}</p>
					</div>
					<div className="slots-wrapper self-center p-0 m-0">
						<h3 className="text-xl">Slots Available</h3>
						<p className="text-base text-center">{slots}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RestaurantModalHeader;
