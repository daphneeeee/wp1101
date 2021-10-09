const images = [
  "https://static.wikia.nocookie.net/characters/images/7/7f/Tom_Cat.jpg/revision/latest?cb=20190404160415",
  "http://2.bp.blogspot.com/-DLKuY8I_nAQ/UT3c_7_xHBI/AAAAAAAAWkU/tudk9Gk5Qn0/s1600/JERRY+23.jpg",
  "https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_1280.png",
  "https://thumbs.dreamstime.com/b/tom-jerry-cartoon-white-background-tom-jerry-cartoon-white-background-226542613.jpg",
];

let currentIndex = 0;
let album = 1;
let albums = [1, 2, 3];

let curImage = document.getElementById("photo"),
  prevButton = document.getElementById("prevBtn"),
  nextButton = document.getElementById("nextBtn");

setCurImage(currentIndex);

function prevImg() {
  if (currentIndex > 0) setCurImage(currentIndex - 1);
}
function nextImg() {
  if (currentIndex < images.length - 1) setCurImage(currentIndex + 1);
}
function setCurImage(index) {
  setSpecialEffect(index);
  currentIndex = index;
  setButtonState(index);
  curImage.src = images[index];
}
function setButtonState() {
  if (currentIndex === 0) {
    prevButton.classList.add("disabled");
  } else if (currentIndex === images.length - 1) {
    nextButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
    nextButton.classList.remove("disabled");
  }
}
function setSpecialEffect(newIndex) {
  previewImage = document.getElementById(`pic${currentIndex}`);
  currentImage = document.getElementById(`pic${newIndex}`);
  previewImage.classList.remove("selected");
  currentImage.classList.add("selected");
}

function selectAlbum(n) {
  if (n > 3) {
    alert("Sorry, empty album!");
  } else {
    prevAlbum = document.getElementById(`album${album}`);
    curAlbum = document.getElementById(`album${n}`);
    prevAlbum.classList.remove("selectedAlbum");
    curAlbum.classList.add("selectedAlbum");
    album = n;
    setCurImage(0);
  }
}

const parentAlbum = document.getElementsByClassName("sidebar");
let num = 3;

function addAlbum() {
  num++;
  albums.push(num);
  const newElement = document.createElement("div");
  const newAlbum = parentAlbum[0].appendChild(newElement);
  newAlbum.innerHTML = `<button onclick="selectAlbum(${albums.length})">Album${albums.length}</button>`;
}
function deleteAlbum() {
  const deleteChild = document.getElementById(`album${album}`);
  parentAlbum[0].removeChild(deleteChild);
  num--;
  albums[album - 1] = 0;
  album = getFirstAlbum() + 1;
  console.log(album);
  const curAlbum = document.getElementById(`album${album}`);
  curAlbum.classList.add("selectedAlbum");
  setCurImage(0);
  if (albums[0] === 0 && albums[1] === 0 && albums[2] === 0) {
  }
}
function getFirstAlbum() {
  for (let i = 0; i < albums.length; i++) {
    if (albums[i] !== 0) {
      return i;
    }
  }
}
