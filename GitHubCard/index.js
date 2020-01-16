/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const entry = document.querySelector('.cards');

axios.get('https://api.github.com/users/liampmoore')
.then(response => {entry.append(cardMaker(response.data))})
.catch(error => {console.log(error)})
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios.get('https://api.github.com/users/liampmoore/followers')
.then(response => {response.data.forEach(item => {
  axios.get(item.url)
  .then(response => { 
    entry.append(cardMaker(response.data))
    })
  .catch(error => {console.log(error)})
  }
)})
.catch(error => {console.log(error)})
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
let entryTimer = 0;
  function cardMaker(object) {
    console.log(object);
    const card = document.createElement('div'),
          cardImage = document.createElement('img'),
          cardInfo = document.createElement('div'),
          cardName = document.createElement('h3'),
          cardUsername = document.createElement('p');
          cardLocation = document.createElement('p'),
          cardProfile = document.createElement('p'),
          cardAddress = document.createElement('a'),
          cardFollowers = document.createElement('p'),
          cardFollowing = document.createElement('p'),
          cardBio = document.createElement('p');

          card.classList.add('card');
          cardInfo.classList.add('card-info');
          cardName.classList.add('name');
          cardUsername.classList.add('username');
          

          cardImage.src = object.avatar_url;
          cardName.textContent = object.name;
          cardUsername.textContent = object.login;
          cardLocation.textContent = object.location;

          cardProfile.append("Profile:");
          cardProfile.append(document.createElement('br'));
          cardAddress.href = object.html_url;
          cardAddress.textContent = object.html_url;
          cardProfile.append(cardAddress);

          cardFollowers.textContent = `Followers: ${object.followers}`;
          cardFollowing.textContent = `Following: ${object.following}`;
          cardBio.textContent = object.bio;

          card.append(cardImage, cardInfo);
          cardInfo.append(cardName, cardUsername, cardLocation, cardProfile, cardFollowers, cardFollowing);

          gsap.from(card, {x: -200, duration: .8, delay: entryTimer})
          entryTimer = entryTimer + .1;

          return card;

  }
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
