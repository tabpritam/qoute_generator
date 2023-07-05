const quoteContainer = document.getElementById("qoute-container");
const qouteText = document.getElementById("qoute");
const authorText = document.getElementById("auther");
const twitterBtn = document.getElementById("twitter");
const newQouteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");

// Get qoutes from API
let apiQoutes = [];

//show loading
const loading = () => {
  loader.style.display = "block";
  quoteContainer.style.display = "none";
  console.log("Loading");
};

//hide loading
const complete = () => {
  loader.style.display = "none";
  quoteContainer.style.display = "flex";
};

//show new qoutes
const newQoute = () => {
  loading();
  //Pick a random qoute from the API
  const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
  //check if author field is blank and replace it with 'unknown'
  if (!qoute.author) {
    authorText.textContent = "-- Unknown";
  } else {
    authorText.textContent = `-- ${qoute.author}`;
  }
  //Check qoute length to determine the styling
  if (qoute.text.length > 120) {
    qouteText.classList.add("long-qoute");
  } else {
    qouteText.classList.remove("long-qoute");
  }
  //set qoute ,hide loader
  qouteText.textContent = qoute.text;
  complete();
};

const getQoutes = async () => {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQoutes = await response.json();
    newQoute();
  } catch (error) {
    //Catch error handling
  }
};

//Tweet a qoute
const tweetQoute = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

//event listiner
newQouteBtn.addEventListener("click", getQoutes);
twitterBtn.addEventListener("click", tweetQoute);

//onload
getQoutes();
// loading();
