function DataProcess(onSuccess, onFailed) {
	this.onSuccess = onSuccess;
	this.onFailed = onFailed;
}

DataProcess.prototype.searchStores = function(keyword) {
	const filteredStores = stores.filter(stores => stores.address.postalCode.toUpperCase().includes(keyword.toUpperCase()));

	if (filteredStores.length) {
		this.onSuccess(filteredStores);
	}else{
		this.onFailed(`${keyword} doesn't match!!`);
	}
};