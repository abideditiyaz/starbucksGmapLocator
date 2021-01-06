// import stores from "./../data/store-data.js";
import DataProcess from "./../data/proses.js";

const main = _ =>{
	const searchElement = document.querySelector('#searchElement');
	const buttonEl = document.querySelector('#searchThis');
	const storeList = document.querySelector('#put');

	const displayThis = _ => {
		let storesHTML = "";
		stores.forEach((store, index)=> {

			const {phoneNumber, address, ownershipTypeCode} = store;
			const {streetAddressLine1, city, countrySubdivisionCode} = address;

			const storeElement = document.createElement('div');
			storeElement.setAttribute('class', 'h-28');

			storeElement.innerHTML = `
				<div class="flex flex-col justify-evenly h-full p-2">
                    <div class="address">
                        <p>${streetAddressLine1}</p>
                        <p>${city}, ${countrySubdivisionCode}</p>
                    </div>
                    <div class="phone-number"><p>${phoneNumber}</p></div>
                    <hr>
                </div>`;
            storeList.appendChild(storeElement);

		})

		const setOnClickListener = _ => {
				let epic = document.querySelectorAll('.stores-list');
				epic.forEach(function(elem, index){
					elem.addEventListener('click', function(){
						google.maps.event.trigger(markers[index], 'click');
						// alert(`Hey this is ${index}`);
					})
				})
			}

		setOnClickListener();


	}

	displayThis();

	const onButtonSearchClicked = _ => {
		const dataProcess = new DataProcess(renderResult, fallbackResult);
		dataProcess.searchStores(searchElement.value);
	}

	const renderResult = results => {

		storeList.innerHTML = "";
		results.forEach((store) => {

			const {phoneNumber, addressLines, brandName, name, openStatusText} = store;

			const storeElement = document.createElement('div');
			storeElement.setAttribute('class', 'h-48');

			storeElement.innerHTML = `
				<div class="h-full flex flex-col justify-evenly p-4">
                    <div class="flex flex-col text-xl font-semibold">
                    	<span>${brandName}</span>
                    	<span>${name}</span>
                    </div>
                    <div class="h-full flex flex-col justify-evenly">
                    	<div class="flex items-center w-full">
	                    	<div class="mr-3">
	                    		<i class="fas fa-location-arrow"></i>
	                    	</div>
	                    	<p>${addressLines}</p>
	                    </div>
                    	<span class="block w-full bg-green-800 rounded-xs text-white p-1 text-center">${openStatusText}</span>
                    </div>
                </div>
                <hr>`;
            storeList.appendChild(storeElement);
		})
	};

	const fallbackResult = message => {
		storeList.innerHTML = "";
		storeList.innerHTML = `<h1>${message}</h1>`
	};

	buttonEl.addEventListener('click', onButtonSearchClicked);
}

export default main;

// evenet.key === "enter"