const input = document.getElementsByTagName("input")[0];
let allVideos = [];
async function fetchYtVids() {
  const response = await fetch(
    "https://api.freeapi.app/api/v1/public/youtube/videos"
  );
  const data = await response.json();
  allVideos = data.data.data;
  displayYtVids(allVideos);
}

function displayYtVids(data) {
  document.getElementsByClassName("yt-vid-list")[0].innerHTML = "";
  data.forEach((individualYtVid) => {
    const vidId = individualYtVid.items.id;
    const vidThumbnail = individualYtVid.items.snippet.thumbnails.maxres.url;
    const vidTitle = individualYtVid.items.snippet.title;
    const ytChannelName = individualYtVid.items.snippet.channelTitle;
    createSection(vidThumbnail, vidTitle, ytChannelName, vidId);
  });
}

function createSection(vidThumbnail, vidTitle, ytChannelName, vidId) {
  const videoElement = document.createElement("div");
  videoElement.classList.add("container");
  videoElement.innerHTML = `<a href="https://www.youtube.com/watch?v=${vidId}" target="_blank"><img class="thumbnail" src="${vidThumbnail}" alt="" /></a>
    <h3 class="title">${vidTitle}</h3>
    <p class="channel-name">${ytChannelName}</p>
  `;
  document.getElementsByClassName("yt-vid-list")[0].appendChild(videoElement);
}

function searchYtVid() {
  const searchValue = input.value.toLowerCase();
  const filteredVids = allVideos.filter((individualYtVid) => {
    return individualYtVid.items.snippet.title
      .toLowerCase()
      .includes(searchValue);
  });
  displayYtVids(filteredVids);
}

fetchYtVids();

input.addEventListener("input", searchYtVid);
