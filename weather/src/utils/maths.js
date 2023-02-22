export function roundObjValues(obj, fieldNameList, decimalPlaces) {
	const scale = Math.pow(10, decimalPlaces) ;
	for (const fieldName of fieldNameList) {
		obj[fieldName] = Math.round((obj[fieldName] * scale)) / scale ;
	}
}