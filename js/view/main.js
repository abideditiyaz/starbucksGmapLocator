let map;
	let infoWindow;
	let markers = [];
	function initMap() {
	    let Ind = {
	        lat: 34.063584,
	        lng: -118.376354
	    }
	    map = new google.maps.Map(document.getElementById('map'), {
	    center: Ind,
	    zoom: 8
	    });
	    infoWindow = new google.maps.InfoWindow();

	    showStoresMarker();

	}

	const showStoresMarker = _ => {
		let bounds = new google.maps.LatLngBounds();
		stores.forEach((store, index) => {
			let latlng = new google.maps.LatLng(
					store.coordinates.latitude,
					store.coordinates.longitude);
			let name = store.name;
			let address = store.addressLines[0];
			let phoneNumber = store.phoneNumber;
			let info = store.openStatusText;
			bounds.extend(latlng);
			createMarker(latlng, name, address, phoneNumber, info);
		})
		map.fitBounds(bounds);
	}

	const createMarker = (latlng, name, address, phoneNumber, info) => {
		let html = "<b>" + name + "<b> <br/>" + address;
		let html2 = `
					<div class="stores-list-marker">
						<div class="wrapper-sign-marker">
		                    <div class="address-marker">
		                        <p>${name}</p>
		                        <p>${info}</p>
		                    </div>
		                    <div class="gmaps-address">
		                    	<div class="circle">
		                    		<i class="fas fa-location-arrow"></i>
		                    	</div>
		                    	<p>${address}</p>
		                    </div>
		                    <div class="gmaps-address">
		                    	<div class="circle">
		                    		<i class="fas fa-phone-alt"></i>
		                    	</div>
		                    	<p>${phoneNumber}</p>
		                    </div>
		                </div>
	                </div>`
		let marker = new google.maps.Marker({
			map: map,
			position: latlng
		});
		google.maps.event.addListener(marker, 'mouseover', function(){
			infoWindow.setContent(html);
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent(html2);
			infoWindow.open(map, marker);
		})
		
		markers.push(marker);
	}

const main = _ =>{
	const searchElement = document.querySelector('#searchElement');
	const buttonEl = document.querySelector('.search i');
	const storeList = document.querySelector('#put');
	const mode = document.querySelector('.camera-inside');
	const page = document.querySelector('.container-popup');

	const displayThis = _ => {
		let storesHTML = "";
		stores.forEach((store, index)=> {

			const {phoneNumber, address, ownershipTypeCode} = store;
			const {streetAddressLine1, city, countrySubdivisionCode} = address;

			const storeElement = document.createElement('div');
			storeElement.setAttribute('class', 'stores-list');

			storeElement.innerHTML = `
				<div class="wrapper-sign">
                    <div class="address">
                        <p>${streetAddressLine1}</p>
                        <p>${city}, ${countrySubdivisionCode}</p>
                    </div>
                    <div class="phone-number"><p>${phoneNumber}</p></div>
                    <hr>
                </div>
                <div class="wrapper-number"><p>${index+1}</p></div>`;
            storeList.appendChild(storeElement);

		})

		mode.addEventListener('click', function () {
			document.body.classList.toggle('dark-mode');
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
			storeElement.setAttribute('class', 'about-store');

			storeElement.innerHTML = `
				<div class="wrapper-list">
                    <div class="brandName">
                    	<span>${brandName}</span>
                    	<span>${name}</span>
                    </div>
                    <div class="inside-list">
                    	<div class="list-address">
	                    	<div class="circle2">
	                    		<i class="fas fa-location-arrow"></i>
	                    	</div>
	                    	<p>${addressLines}</p>
	                    </div>
                    	<span>${openStatusText}</span>
                    </div>
                </div>`;
            storeList.appendChild(storeElement);
		})
	};

	const fallbackResult = message => {
		storeList.innerHTML = "";
		storeList.innerHTML = `<h1>${message}</h1>`
	};

	buttonEl.addEventListener('click', onButtonSearchClicked);
}