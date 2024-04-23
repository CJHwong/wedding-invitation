import { getMessagesFromGoogleSheet } from "./google.js";
import { sleep } from "./utils.js";

async function getMessages() {
  try {
    const data = await getMessagesFromGoogleSheet();
    return data
      .map((e) => ({
        name: e[0],
        text: e[1],
      }))
      .filter((e_1) => !!e_1.text) // Filter out empty messages
      .sort(() => Math.random() - 0.5); // Shuffle the messages
  } catch (error) {
    return console.error("Error:", error);
  }
}

function getAvatar(username) {
  return `https://api.dicebear.com/8.x/bottts-neutral/svg?radius=50&seed=${username}`;
}

function getNextTweet(container, username, text, lastTweet) {
  /*
    <div class="tweet-container slide-out">
        <div class="tweet-header">
            <div class="tweet-profile-pic"></div>
            <span class="tweet-author">Fake Account</span>
        </div>
        <p class="tweet-text">
            This is a fake tweet. You can replace this text with any content you
            like!
        </p>
    </div>
    */
  const nextTweetText = text;

  const newTweet = document.createElement("div");
  newTweet.classList.add("tweet-container");

  const newTweetHeader = document.createElement("div");
  newTweetHeader.classList.add("tweet-header");

  const profilePic = document.createElement("div");
  const profileImg = document.createElement("img");
  profileImg.src = getAvatar(username);
  profilePic.appendChild(profileImg);
  profilePic.classList.add("tweet-profile-pic");
  newTweetHeader.appendChild(profilePic);

  const authorSpan = document.createElement("span");
  authorSpan.classList.add("tweet-author");
  authorSpan.textContent = username;
  newTweetHeader.appendChild(authorSpan);

  const newTweetText = document.createElement("p");
  newTweetText.classList.add("tweet-text");
  newTweetText.textContent = nextTweetText;

  newTweet.appendChild(newTweetHeader);
  newTweet.appendChild(newTweetText);

  if (!lastTweet) {
    container.appendChild(newTweet);
  } else {
    lastTweet.parentNode.insertBefore(newTweet, lastTweet);
    lastTweet.classList.add("slide-out");
  }

  return newTweet;
}

export async function startTweetStream(container) {
  let lastTweet;
  let tweets;

  while (true) {
    try {
      tweets = await getMessages();
    } catch (error) {
      console.error("Error:", error);
    }

    for (const t of tweets) {
      lastTweet = getNextTweet(container, t.name, t.text, lastTweet);
      await sleep(3500);
    }
    Array.from(container.querySelectorAll(".tweet-container"))
      .filter((e) => e != lastTweet)
      .forEach((e) => e.remove());
  }
}
