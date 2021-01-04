function DataProcess(onSuccess, onFailed) {
	this.onSuccess = onSuccess;
	this.onFailed = onFailed;
}

DataProcess.prototype.searchStores = function(keyword) {
	const filteredStores = stores.filter(stores => stores.address.postalCode.toUpperCase().includes(keyword.toUpperCase()));
	const filteredStoresName = stores.filter(stores => stores.name.toUpperCase().includes(keyword.toUpperCase()));
	const filteredStoresAddress = stores.filter(stores => stores.addressLines[0].toUpperCase().includes(keyword.toUpperCase()));

	if (filteredStores.length) {
		this.onSuccess(filteredStores);
	}else if (filteredStoresName) {
		this.onSuccess(filteredStoresName)
	}else if (filteredStoresAddress) {
		this.onSuccess(filteredStoresAddress)
	}else{
		this.onFailed(`${keyword} doesn't match!!`);
	}
};