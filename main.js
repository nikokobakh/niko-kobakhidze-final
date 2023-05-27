function initMainSlider() {
  let imagesArr = ["nika1.jpg", "nika2.jpg", "nika3.jpg"];
  let mainNavItems = [...document.getElementById("slider-nav").children];
  let sliderFrame = document.getElementById("frame");
  let sliderIteration = 1;

  setInterval(() => {
    if (sliderIteration === imagesArr.length) {
      sliderIteration = 0;
    }
    sliderFrame.src = "./assets/images/" + imagesArr[sliderIteration];

    for (let index = 0; index < mainNavItems.length; index++) {
      mainNavItems[index].classList.remove("active");
    }

    mainNavItems[sliderIteration].classList.add("active");

    sliderIteration++;
  }, 5000);

  function setSliderItem(key) {
    sliderIteration = key;
    sliderFrame.src = "./assets/images/" + imagesArr[key];
    for (let index = 0; index < mainNavItems.length; index++) {
      mainNavItems[index].classList.remove("active");
    }
    mainNavItems[key].classList.add("active");
  }

  mainNavItems.forEach((element, key) => {
    element.onclick = function () {
      setSliderItem(key);
    };
  });
}

initMainSlider();

function initRecSlider() {
  let people = [
    {
      name: "Nino Ninodze",
      position: "Writer",
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      pic: "d3.svg",
    },
    {
      name: "Giorgi Giorgadze",
      position: "Hair Stylist",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      pic: "d4.svg",
    },
    {
      name: "Shotiko shotadze",
      position: "Professional Shota",
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      pic: "d5.svg",
    },
  ];
  let recNavItems = [...document.getElementById("rec-nav").children];
  let recQuote = document.getElementById("rec-quote");
  let recFrame = document.getElementById("rec-frame");
  let recPosition = document.getElementById("rec-position");
  let recName = document.getElementById("rec-name");

  function setRec(key) {
    recQuote.innerText = people[key].quote;
    recFrame.src = "./assets/images/" + people[key].pic;
    recPosition.innerText = people[key].position;
    recName.innerText = people[key].name;

    for (let index = 0; index < recNavItems.length; index++) {
      recNavItems[index].classList.remove("active");
    }
    recNavItems[key].classList.add("active");
  }

  recNavItems.forEach((element, key) => {
    element.onclick = function () {
      setRec(key);
    };
  });
  setRec(0);
}

initRecSlider();

function initCategorySort() {
  let categoryNavItems = [...document.getElementById("projects-nav").children];
  let projectCards = [...document.getElementById("project-cards").children];

  function setCategory(category, key) {
    console.log(category);

    for (let index = 0; index < categoryNavItems.length; index++) {
      categoryNavItems[index].classList.remove("active");
    }
    categoryNavItems[key].classList.add("active");

    for (let index = 0; index < projectCards.length; index++) {
      projectCards[index].classList.remove("active");
      if (projectCards[index].dataset.category === category) {
        projectCards[index].classList.add("active");
      }
    }
    categoryNavItems[key].classList.add("active");
    if (category === "all") {
      for (let index = 0; index < projectCards.length; index++) {
        projectCards[index].classList.add("active");
      }
    }
  }

  categoryNavItems.forEach((element, key) => {
    element.onclick = function () {
      setCategory(element.dataset.category, key);
    };
  });
  setCategory("all", 0);
}

initCategorySort();

let contactForm = document.getElementById("contact-form");
let modalCloseButton = document.getElementById("continue-button");
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function toggleModal() {
  document.getElementById("modal").classList.toggle("active");
}

function submitForm(event) {
  event.preventDefault();

  postData("https://borjomi.loremipsum.ge/api/send-message", {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    website: document.getElementById("contact-website").value,
    message: document.getElementById("contact-message").value,
  })
    .then((data) => {
      console.log(data);
      toggleModal();
    })
    .catch((err) => {
      console.log(err);
    });
}

contactForm.addEventListener("submit", submitForm, false);
modalCloseButton.addEventListener("click", toggleModal);
