function RestaurantModalHeader(props) {
  const { imgUrl, rating, times, description, slots } = props.bodyDetails;

  return (
    <div>
      <div className="flex">
        <div>
          <div className="flex-auto flex flex-row">
            <label htmlFor="email">Email</label>
          </div>

          <div className="flex-auto">
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div>
          <div className="flex-auto">
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className="flex-auto">
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantModalHeader;
