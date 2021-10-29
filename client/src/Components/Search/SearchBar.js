import { useEffect, useContext, useState } from "react";

function SearchBar(props) {
	const { setUserPostcodeInput } = props;
	const [userInput, setUserInput] = useState("");

	return (
		<section className="p-10 w-2/3 text-2xl">
			<div class="bg-white flex items-center rounded-full shadow-xl">
				<input
					class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
					id="search"
					type="text"
					placeholder="Enter Postcode..."
					onChange={(e) => setUserInput(e.target.value)}
				/>

				<div class="p-4">
					<button
						onClick={() => setUserPostcodeInput(userInput)}
						class="bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-900 focus:outline-none w-12 h-12 flex items-center justify-center"
					>
						<i class="material-icons text-xs">search</i>
					</button>
				</div>
			</div>
		</section>
	);
}

export default SearchBar;
