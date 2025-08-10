

const displayDayplan = (response) => {
    console.log(response);
    new Typewriter('#suggestions', {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
    });
}

const generateDayplan = (event) => {
    event.preventDefault();
    // infos for api
    const firstInput = document.querySelector('#first-input');
    const secondInput = document.querySelector('#second-input');
    const thirdInput = document.querySelector('#third-input');
    const fourthInput = document.querySelector('#fourth-input');
    // api url
    let apiKey = '02060cacd430ctof7d20b656741fc18d';
    let prompt = `Generate a short dayplan for the user based on his ${firstInput.value} and current goal: ${secondInput.value}. Then take his amount of time: ${thirdInput.value} hours, and give suggestions for that time of the day: ${fourthInput.value}`;
    let context = 'You are an organized planner who can manage the freetime for a user when they cannot do it by themself. You are nice and polite. Give only 3 suggestions. Give the answer back with mini headings <h6> as a list with linebreaks with <br />. It has to be concisely and easy to read.';
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    // api call
    axios.get(apiUrl).then(displayDayplan);
    
    // data update
    let userMood = document.querySelector('#user-mood');
    let userGoal = document.querySelector('#user-goal');
    let userTime = document.querySelector('#user-time');
    let userTimezone = document.querySelector('#user-timezone');
    userMood.innerHTML = firstInput.value.toLowerCase();
    userGoal.innerHTML = secondInput.value.toLowerCase();
    if(thirdInput.value === "1") {
        userTime.innerHTML = `${thirdInput.value} hour`;
    } else {
        userTime.innerHTML = `${thirdInput.value} hours`;
    }
    userTimezone.innerHTML = fourthInput.value.toLowerCase();

    let dayplanSection = document.querySelector('#dayplan-section');
    let motivationSection = document.querySelector('#motivation-section');
    dayplanSection.classList.remove("hidden");
    motivationSection.classList.remove("hidden");

    let suggestionsText = document.querySelector("#suggestions");
    suggestionsText.innerHTML = '<p class="blink">Generating you plan</p>';
}

let inputButton = document.querySelector("#input-form");
inputButton.addEventListener("submit", generateDayplan);