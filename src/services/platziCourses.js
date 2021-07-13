export const getPlatziCourse = () => {
  let aux;
  fetch(`https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@krisyupher`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      aux = data.userData.courses;
      return data.userData.courses;
    })
    .catch(() => {
      console.log("Grave error");
    });
  return aux;
};
