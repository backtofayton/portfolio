// Portfolio data
const portfolioObj = {
  1: {
    name: 'Show My Neighbors',
    description: 'A SPA built with React, Redux, showing neighboring countries of the visitor.',
    screenshotUrl: './works/capstone_location_ss-wide.gif',
    tech: ['HTML', 'CSS', 'JS', 'Bootstrap', 'SCSS', 'React', 'Redux'],
    linkToLive: 'https://damdafayton-countries.herokuapp.com/',
    linkToSource: 'https://github.com/damdafayton/who-is-my-neighbor',
  },
  6: {
    name: 'Dating',
    description: 'Dummy dating website\n email: dummy@dummy.com\n password: damdafayton',
    screenshotUrl: './works/screenshot-dating.jpg',
    tech: ['HTML', 'CSS', 'JS', 'MongoDB', 'Bootstrap.css', 'Node.js'],
    linkToLive: 'http://dating-clone.herokuapp.com/',
    // linkToSource: 'http://www.github.com/uber',
  },
  2: {
    name: 'Yelp-Camp',
    description: 'Dummy camping website\n username: dummy\n password: damdafayton',
    screenshotUrl: './works/ss-camping.jpg',
    tech: ['HTML', 'CSS', 'JS', 'MongoDB', 'Bootstrap.css', 'Node.js'],
    linkToLive: 'http://fake-camping.herokuapp.com/',
    linkToSource: 'https://github.com/damdafayton/dummy-camping',
  },
  3: {
    name: 'News Poster',
    description: 'Dummy news portal\n username: herokuguest\n password: herokuguest..',
    screenshotUrl: './works/ss-bestnews.jpg',
    tech: ['HTML', 'CSS', 'JS', 'Python', 'PostgreSQL', 'Docker', 'Django.py', 'React.js'],
    linkToLive: 'https://bestnewsposter.herokuapp.com/',
    linkToSource: 'https://github.com/damdafayton/bestnewsposter',
  },
  4: {
    name: 'Portfolio Page',
    description: 'This very page',
    screenshotUrl: './works/ss-portfolio.jpg',
    tech: ['HTML', 'CSS', 'JS', 'SCSS.css'],
    linkToLive: 'https://damdafayton.github.io/portfolio/',
    linkToSource: 'https://github.com/damdafayton/portfolio',
  },
  5: {
    name: 'Restaurant',
    description: 'Dummy restaurant web page',
    screenshotUrl: './works/ss-restaurant.jpg',
    tech: ['HTML', 'CSS', 'JS', 'Bootstrap.css', 'SCSS.css'],
    linkToLive: 'https://damdafayton.github.io/restaurant/',
    linkToSource: 'https://github.com/damdafayton/restaurant',
  }
};

// CREATE PORTFOLIO CARDS
const cardContainer = document.querySelector('#my-works > .card-container');
// Create cards based on the amount of projects
Object.keys(portfolioObj).forEach(() => {
  cardContainer.innerHTML += (`
    <div class= "card">
      <img alt="screenhost of my work" src="#">
      <h3></h3>
      <ul class="tech"></ul>
      <span></span>
      <a class="btn-green" href="#">See Project</a>
    </div>
  `);
});

// FILL PORTFOLIO CARDS
function techListElementCreator(tech) {
  const listItem = document.createElement('li');
  listItem.innerText = tech;
  listItem.className = 'tech-tag';
  return listItem;
}

function ulFiller(ul, portfolioOrder) {
  portfolioObj[portfolioOrder].tech.forEach((newTech) => {
    // console.log('add newTech: ', newTech)
    const listElement = techListElementCreator(newTech);
    ul.appendChild(listElement);
  });
}

const myWorks = document.querySelectorAll('#my-works>.card-container>.card');
const popUp = document.querySelector('#popUp');

function portfolioPopUp(e) {
  e.preventDefault();
  let n = 0;
  // Find the order of clicked item among all the works
  myWorks.forEach((work, i) => {
    if (e.target.parentElement === work) { n = i; }
  });
  n += 1; // to adjust for object order

  // Create link elements
  imgLive = document.createElement('img')
  imgLive.src = "./icons/see-live.svg"
  imgSource = document.createElement('img')
  imgSource.src = "icons/source.svg"

  aLive = document.createElement('a')
  aLive.classList.add('btn-green', 'me-1')
  aLive.target = "_blank"
  aLive.href = portfolioObj[n].linkToLive
  aLive.innerText = 'See Live'
  aLive.appendChild(imgLive)

  aSource = document.createElement('a')
  aSource.classList.add('btn-green', 'ms-1')
  aSource.target = "_blank"
  aSource.href = portfolioObj[n].linkToSource
  aSource.innerText = 'See Source'
  aSource.appendChild(imgSource)

  const popUpElements = popUp.querySelectorAll('*');
  popUpElements.forEach((element) => {
    switch (element.id || element.tagName) {
      case 'popUpImage':
        element.src = portfolioObj[n].screenshotUrl;
        break;
      case 'popUpDescription':
        element.innerText = portfolioObj[n].description;
        break;
      case 'popUpTech':
        ulFiller(element, n);
        break;
      case 'SPAN':
        element.innerHTML = '' // reset whatever element was put in during previous fill
        if (portfolioObj[n].linkToLive) {
          element.appendChild(aLive.cloneNode(true))
        }
        if (portfolioObj[n].linkToSource) {
          element.appendChild(aSource.cloneNode(true))
        }
        break;
      default:
        break;
    }
  });

  popUp.classList.add('show');
  // body.classList.add('body-blur')
}

myWorks.forEach((work, i) => {
  i += 1;
  const subElements = work.querySelectorAll('*');
  subElements.forEach((element) => {
    switch (element.tagName) {
      case 'IMG':
        element.src = portfolioObj[i].screenshotUrl;
        return 0;
      case 'H3':
        element.innerText = portfolioObj[i].name;
        return 0;
      case 'UL':
        ulFiller(element, i);
        return 0;
      case 'A':
        // Click button for portfolio popup
        element.addEventListener('click', portfolioPopUp);
        return 0;
      default:
        return 0;
    }
  });
});

// PORTFOLIO DETAILS POPUP CLOSE LOGIC
const popUpClose = document.querySelector('#popUp .svgClose');
const body = document.querySelector('body');
const uList = popUpClose.parentElement.querySelector('UL');

function closePopup() {
  popUp.classList.remove('show');
  body.classList.remove('body-blur');
  // Clean the list
  uList.innerHTML = '';
}

popUpClose.addEventListener('click', closePopup);
window.addEventListener('click', (e) => {
  // console.log('hello', e.target)
  if (e.target == popUpClose.parentElement.parentElement) {
    closePopup()
  }
});