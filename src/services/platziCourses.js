export const getPlatziCourse = () => {
	let aux;
	fetch(`https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@krisyupher`)
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			console.log("3")
			console.log("data.userData", data.userData)
			aux = data.userData.courses;
			return data.userData.courses;
			console.log("4")
		})
		.catch(() => {
			console.log("Grave error")
		})
	console.log("5")
	return aux;
}