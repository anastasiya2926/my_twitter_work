import "modern-css-reset";
import "./../assets/styles/tailwind.sass";
import "./../assets/styles/style.sass";
import "phosphor-icons";
import mockData from "./data.json";


console.log("hola");



////////////////////////////////////////////// RENDER TWEETS from mockData

window.addEventListener("load", () => {
  renderTweets();
  initTweetSearch();
  initTweetEvents();
  initFormEvents();

});



const renderTweets = () => {
  const tweetsBlock = document.querySelector(".feed_tweet");
  let tweetsHTML = "";
  mockData.forEach((dataItem) => {
    tweetsHTML += `
      <div class="tweet_container border-b pb-4 border-gray-500" dataItem>
        <div class="profile flex items-start justify-between mt-6 space-x-2  ">
          <div class="profile_pic rounder-full"><img src="${dataItem.user.pic}" alt=""></div>
          <div class="user flex  justify-between items-start mt-6 space-x-4 ">
            <div class="user_name font-semibold"> ${dataItem.user.name} </div>
            <div class="user_at text-gray-500">@${dataItem.user.at}</div>
            <div class="user_time text-gray-500">${dataItem.user.time}min</div>
          </div>
        </div>
        <div class="tweet flex-row ml-2 mt-4">
          <div class="tweet_content"><p>${dataItem.user.tweet}</p></div>
        </div>
        <div class="content_footer flex items-center justify-between mt-6">
          <div class="content_menu flex items-center space-x-4">
            <div class="user_comments">
              <div class="number text-gray-500">${dataItem.user.comments}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path fill="#606060"
              d="M10.534 1.681l-3.11-.007h-.002c-3.28 0-5.85 2.57-5.85 5.851 0 3.074 2.39 5.405 5.599 5.528v2.871c0 .081.033.215.09.302a.558.558 0 00.775.172c.198-.126 4.855-3.105 6.066-4.13 1.427-1.207 2.28-2.977 2.282-4.734v-.012c-.004-3.276-2.572-5.84-5.85-5.841zm2.84 9.73c-.85.72-3.646 2.553-5.078 3.482v-2.39a.562.562 0 00-.563-.563h-.297c-2.745 0-4.738-1.857-4.738-4.414 0-2.651 2.076-4.727 4.725-4.727l3.11.008h.002c2.649 0 4.724 2.074 4.726 4.721-.002 1.433-.706 2.884-1.885 3.883h-.001z" />
              </svg>
            </div>
            <div class="user_retweets">
              <div class="number text-gray-500 ">${dataItem.user.retweets}</div>
              <div class="button_rts hover:bg-green-600 rounded-full">
                <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none"
                viewBox="0 0 18 14">
                <path fill="#606060"
                d="M17.828 9.752a.562.562 0 00-.796 0l-1.665 1.665v-7.68A2.816 2.816 0 0012.556.925H8.168a.563.563 0 000 1.125h4.387c.93 0 1.688.758 1.688 1.688v7.68l-1.665-1.665a.562.562 0 10-.795.794l2.625 2.625c.108.11.252.165.397.165a.555.555 0 00.398-.165l2.625-2.625a.56.56 0 000-.795zm-7.995 2.46H5.445a1.69 1.69 0 01-1.687-1.687v-7.68L5.423 4.51a.564.564 0 00.796 0 .562.562 0 000-.795L3.594 1.09a.56.56 0 00-.795 0L.174 3.715a.562.562 0 10.795.795l1.665-1.665v7.68a2.816 2.816 0 002.813 2.813h4.387a.563.563 0 000-1.125h-.001z" />
                </svg>
              </div>
            </div>
            <div class="user_likes text-gray-500 ">
              <div class="number ">${dataItem.user.likes}</div>
              <div class="button_likes hover:bg-red-600 rounded-full border-m-2">
                <svg class="button_likes" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                viewBox="0 0 18 18">
                <path fill="#606060"
                d="M9 16.229h-.01c-1.938-.037-7.527-5.087-7.527-9.87 0-2.298 1.893-4.316 4.052-4.316 1.717 0 2.872 1.185 3.484 2.047.61-.86 1.766-2.047 3.484-2.047 2.16 0 4.053 2.018 4.053 4.316 0 4.782-5.59 9.833-7.528 9.868H9v.002zM5.516 3.168c-1.56 0-2.928 1.49-2.928 3.191 0 4.305 5.276 8.697 6.413 8.744 1.138-.047 6.412-4.438 6.412-8.744 0-1.7-1.367-3.191-2.927-3.191-1.896 0-2.955 2.202-2.964 2.224-.172.421-.867.421-1.04 0-.01-.023-1.069-2.224-2.966-2.224z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
  });

  tweetsBlock.innerHTML = tweetsHTML;
  //



  /////////////////////////////////////// COUNT RTS & LIKES 

  initTweetEvents()
};

const initTweetEvents = () => {
  const allTweets = document.querySelectorAll(".tweet_container")

  //RTs
  allTweets.forEach((tweet, i) => {
    const count_retweets = tweet.querySelector(".button_rts")
    count_retweets.addEventListener("click", () => {
      mockData[i].user.retweets++
      renderTweets()
    })
  })

  //Likes
  allTweets.forEach((tweet, i) => {
    const count_likes = tweet.querySelector(".button_likes")
    count_likes.addEventListener("click", () => {
      mockData[i].user.likes++
      renderTweets()
    })
  })

}


//////////////////////////////////////////////////////// SEARCHBAR SEARCH WORDS 
const initTweetSearch = () => {
  const searchInput = document.querySelector(".search_text");
  searchInput.addEventListener("keydown", () => {
    if (searchInput.value.length > 2) {
      const filteredData = mockData.filter((dItem) =>
        dItem.user.tweet.includes(searchInput.value)
      );
      console.log(filteredData);
      if (filteredData.length > 0) {
        ///
      } else {
        const tweetsBlock = document.querySelector(".feed_tweet");
        tweetsBlock.innerHTML = "There's nothing to see here...";
      }
    } else {
      renderTweets()
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////// MODAL WINDOW

if (document.getElementById("btnModal")) {
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("btnModal");
  const span = document.getElementsByClassName("close")[0];
  const body = document.getElementsByTagName("body")[0];

  btn.onclick = function () {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  }

  span.onclick = function () {
    modal.style.display = "none";

    body.style.position = "relative";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }
}

//////////////////////////////////////////////////////////// SUBMIT TWEET (no entiendo muy bien como hacer que funcione)
const initFormEvents = () => {
  const tweetForm = document.forms.new;
  const tweetMessage = tweetForm.elements.tweet;

  tweetForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (tweetMessage.value != "") {
      tweets.push({
        at: mytwitter,
        tweet: tweetMessage.value,
        
        likes:0,
        retweets:0,
        comments:0,
        
        



      });

      //
      renderTweets();
      initTweetEvents();


      tweetForm.reset();
    }
  });
}