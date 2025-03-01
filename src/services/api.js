export const fetchQuestion = async() => {
   const response = await fetch("http://localhost:8080/api/cities/question");
   const ele = await response.json();
   return ele;
};

export const fetchOptions = async(cityId) => {

   const response = await fetch(`http://localhost:8080/api/cities/options?cityId=${cityId}`, {
        headers: { "Content-Type": "application/json" }
   });
   const ele = await response.json();
   
   return ele;
};

export const checkAnswer = async (questionId, answer) => {
    const response = await fetch(`http://localhost:8080/api/cities/checkAnswer?questionId=${questionId}&answer=${answer}`, {
        headers: { "Content-Type": "application/json" }
   });
    const ele = await response.json();
    return ele;
};
