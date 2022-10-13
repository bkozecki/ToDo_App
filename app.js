const body = document.querySelector("body");
const mainImg = document.querySelector(".img_wrap");
const toDoContent = document.querySelector(".todo_content");
const themeToggle = document.querySelector(".theme_toggle");
const input = document.getElementById("input");
const todoList = document.getElementById("todoList");
const toDoListItem = document.querySelectorAll(".todo_list--item");
let counter = document.getElementById("counter");
const clearAllBtn = document.getElementById("clear");
const completedBtn = document.querySelectorAll(".completedFilter");
const activeBtn = document.querySelectorAll(".activeFilter");
const allBtn = document.querySelectorAll(".all");
const todoGuide = document.querySelector(".todo_quide");
const filtersMobile = document.querySelector(".filters_wrap_mobile");

// FUNCTIONALITY

counter.textContent = 0;

function hideEmpty() {
  todoList.innerHTML = "";
  counter.textContent = 0;
  toDoContent.classList.remove("todo--active");
  todoGuide.classList.remove("todo_quide--active");
  filtersMobile.classList.remove("filters_mobile--active");
}

// adding todos--------

const addToDo = function (e) {
  const clicked = e.key;
  const template = document.getElementById("content");
  const templateBody = document.importNode(template.content, true);
  const templateList = templateBody.querySelector("li");
  const templateListAll = templateBody.querySelectorAll("li");
  const userInput = templateBody.querySelector("p");
  const check = templateBody.querySelector(".check");
  const closer = templateBody.querySelector(".cross");
  templateList.classList.add("active");

  if (clicked !== "Enter" || input.value === "") return;

  userInput.textContent = `${input.value
    .at(0)
    .toUpperCase()}${input.value.slice(1)}`;

  // adding new ToDo's
  toDoContent.classList.add("todo--active");
  todoList.append(templateBody);
  todoGuide.classList.add("todo_quide--active");
  filtersMobile.classList.add("filters_mobile--active");
  input.value = "";
  counter.textContent = +counter.textContent + 1;

  // ToDo's functionality

  //removing single todo
  templateList.addEventListener("mouseover", function () {
    closer.classList.add("cross--active");
  });
  templateList.addEventListener("mouseleave", function () {
    closer.classList.remove("cross--active");
  });
  closer.addEventListener("click", function () {
    templateList.remove();
    counter.textContent = +counter.textContent - 1;
    if (counter.textContent < 1) hideEmpty();
  });

  //marking todo as complete
  check.addEventListener("click", function () {
    check.classList.toggle("check--active");
    templateList.classList.toggle("completed");
    templateList.classList.toggle("active");
  });
  // FILTERS ------------

  completedBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (!templateList.classList.contains("completed")) {
        templateList.style.display = "none";
      } else {
        templateList.style.display = "flex";
      }
    })
  );

  activeBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (!templateList.classList.contains("active")) {
        templateList.style.display = "none";
      } else {
        templateList.style.display = "flex";
      }
    })
  );

  allBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      templateList.style.display = "flex";
    })
  );

  // drag n drop ----------

  function getDragAfterElement(y) {
    const draggableElements = [
      ...todoList.querySelectorAll(".draggable:not(.dragging)"),
    ];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, Number.NEGATIVE_INFINITY).element;
  }

  templateListAll.forEach((el) => {
    el.addEventListener("dragstart", function () {
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", function () {
      el.classList.remove("dragging");
    });
  });
  todoList.addEventListener("dragover", function (e) {
    e.preventDefault();
    const afterEl = getDragAfterElement(e.clientY);
    const draggable = document.querySelector(".dragging");
    console.log(afterEl);
    if (afterEl === undefined) {
      todoList.appendChild(draggable);
    } else {
      todoList.insertBefore(draggable, afterEl);
    }
  });
};

input.addEventListener("keypress", addToDo);

// clear all btn

clearAllBtn.addEventListener("click", hideEmpty);

// theme switcher---------

themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeToggle.src = "./images/icon-sun.svg";
    mainImg.style.background = "url(./images/bg-desktop-dark.jpg)";
    toDoContent.classList.add("todo_content--dark");
    input.classList.add("input-dark");
    filtersMobile.classList.add("input-dark");
  } else {
    themeToggle.src = "./images/icon-moon.svg";
    mainImg.style.background = "url(./images/bg-desktop-light.jpg)";
    toDoContent.classList.remove("todo_content--dark");
    input.classList.remove("input-dark");
    filtersMobile.classList.remove("input-dark");
  }
});
