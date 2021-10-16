let todo = [];
let left = 0;
let done = 0;

// add new item
let inputNode = document.getElementsByClassName("todo-app__input")[0];
let itemList = document.getElementById("todo-list");
let item = document.getElementsByTagName("li");
let totalLeft = document.getElementsByClassName("todo-app__total")[0];
let footer = document.getElementById("todo-footer");
let cleanBtn =
  document.getElementsByClassName("todo-app__clean")[0].firstElementChild;
showFooter();
cleanBtn.style.display = "none";

inputNode.addEventListener("keydown", function (e) {
  if (e.keyCode === 13 && inputNode.value !== "") {
    todo.push({ name: inputNode.value, state: false, deleted: false });
    let newItem = new Item(e.target.value).itemList;
    itemList.appendChild(newItem);
    showFooter();
    left++;
    showTotal();
    inputNode.value = "";
  }
});
cleanBtn.addEventListener("click", () => {
  let array = Array.from(item);
  array.map((node) => {
    if (node.classList.length > 1) {
      itemList.removeChild(node);
      done--;
    }
  });
  showFooter();
});

class Node {
  constructor(tag, className, ...arg) {
    this.node = document.createElement(tag);
    if (className) this.node.className = className;
    for (let i = 0; i < arg.length; i += 2) {
      this.node.setAttribute(arg[i], arg[i + 1]);
    }
  }
  get thisNode() {
    return this.node;
  }
}

class Item {
  constructor(data) {
    const index = todo.length - 1;
    this.node = document.createElement("li");
    this.node.className = "todo-app__item";

    let div = new Node("div", "todo-app__checkbox").thisNode;

    let checkbox = new Node("input", null, "id", index, "type", "checkbox")
      .thisNode;
    checkbox.addEventListener("click", () => {
      if (!todo[index].state) {
        left--;
        done++;
        this.node.classList.add("done");
      } else {
        left++;
        done--;
        this.node.classList.remove("done");
      }
      todo[index].state = !todo[index].state;
      text.classList.toggle("completed");
      checkCompleted();
      showTotal();
    });

    let label = new Node("label", null, "for", index).thisNode;

    let text = new Node("h1", "todo-app__item-detail").thisNode;
    text.textContent = data;

    let img = new Node("img", "todo-app__item-x").thisNode;
    img.src = "img/x.png";
    img.addEventListener("click", () => {
      if (!todo[index].state) {
        left--;
        showTotal();
      } else {
        done--;
      }
      checkCompleted();
      itemList.removeChild(img.parentNode);
    });

    this.node.appendChild(div);
    this.node.appendChild(text);
    this.node.appendChild(img);
    div.appendChild(checkbox);
    div.appendChild(label);
  }
  get itemList() {
    return this.node;
  }
}

function showTotal() {
  totalLeft.textContent = `${left} left`;
}

// filter control
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");

all.addEventListener("click", () => {
  itemList.childNodes.forEach((node) => {
    node.style.display = "flex";
  });
});

active.addEventListener("click", () => {
  itemList.childNodes.forEach((node) => {
    if (node.classList.length > 1) node.style.display = "none";
    else node.style.display = "flex";
  });
});

completed.addEventListener("click", () => {
  itemList.childNodes.forEach((node) => {
    if (node.classList.length > 1) node.style.display = "flex";
    else node.style.display = "none";
  });
});

function checkCompleted() {
  if (done === 0 && left === 0) {
    footer.style.display = "none";
  } else if (done > 0) {
    cleanBtn.style.display = "flex";
  } else if (done === 0) {
    cleanBtn.style.display = "none";
  }
}
function showFooter() {
  if (done === 0 && left === 0) {
    footer.style.display = "none";
  } else {
    footer.style.display = "flex";
  }
}

{
  /* <li class="todo-app__item">
  <div class="todo-app__checkbox">
    <input type="checkbox" id="" />
    <label for=""></label>
  </div>
  <h1 class="todo-app__item-detail">This is an item</h1>
  <img src="img/x.png" class="todo-app__item-x" />
</li> */
}
