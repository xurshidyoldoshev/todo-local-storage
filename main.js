const input = document.querySelector(".inp");
const list = document.querySelector(".list");
const btn = document.querySelector(".btn");
const elForm = document.querySelector(".form");
const modal = document.querySelector(".modal");
const modalWrapper = document.querySelector(".modal-wrapper");
const allCount = document.querySelector(".all-count")
const complatedCount = document.querySelector(".complated-count")
const unComplatedCount = document.querySelector(".uncomplated-count")

let todos = JSON.parse(window.localStorage.getItem("todos")) || [];

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target[0].value.trim()) {
        let data = {
            id: todos.length + 1,
            value: e.target[0].value,
            isComplete: false
        };
        todos.push(data);
        renderTodo(todos, list);
        e.target.reset();

        window.localStorage.setItem("todos", JSON.stringify(todos))
    } else {
        alert("inputni to'ldiring !")
    }
});

function renderTodo(arr, list) {

    list.innerHTML = "";
    arr.map((item, index) => {
        let elItem = document.createElement("li");
        elItem.classList.add("item");
        elItem.innerHTML = `
            <div class="value-wrapper ${item.isComplete ? "checked" : ""}">
                <span>${index + 1}.</span>
                <strong>${item.value}</strong>
            </div>
            <div class="btn-wrapper">
            <label>
            <input class="checkbox-todo visually-hidden" type="checkbox" id="${item.id}" />
            <div class="check-wrapper">
                <span class=${item.isComplete ? "check-open" : "check-inner"}></span>
            </div>
            </label>
                <button type="button" onclick="uptadeClick(${item.id})" class="edit-btn">Edit</button>
                <button type="button" onclick="deleteClick(${item.id})" class="delete-btn">Delete</button>
            </div>
        `;
        list.append(elItem);
    });
    allCount.textContent = todos.length
    const countComplatedFilter = todos.filter(item => item.isComplete == true)
    complatedCount.innerHTML = countComplatedFilter.length
    const unCountComplatedFilter = todos.filter(item => item.isComplete == false)
    unComplatedCount.innerHTML = unCountComplatedFilter.length
}

renderTodo(todos, list)

allCount.parentElement.addEventListener("click", () => {
    renderTodo(todos, list)
    window.localStorage.setItem("todos", JSON.stringify(todos))
})

complatedCount.parentElement.addEventListener("click", () => {
    const data = todos.filter(item => item.isComplete == true)
    renderTodo(data, list)
    window.localStorage.setItem("todos", JSON.stringify(todos))
})

unComplatedCount.parentElement.addEventListener("click", () => {
    const data = todos.filter(item => item.isComplete == false)
    renderTodo(data, list)
    window.localStorage.setItem("todos", JSON.stringify(todos))
})

function deleteClick(id) {
    modalWrapper.classList.add("open-modal")
    modal.innerHTML = `
        <div class="delete-wrapper">
            <h2>Are you sure delete</h2>
            <div>
                <button onclick="cancelModal()">Cancel</button>
                <button onClick="deleteSureClick(${id})">Delete</button>
            </div>
        </div>
    `
}

function deleteSureClick(id) {
    const data = todos.findIndex(item => item.id == id)
    todos.splice(data, 1)
    modalWrapper.classList.remove("open-modal")
    renderTodo(todos, list)
    window.localStorage.setItem("todos", JSON.stringify(todos))
}

function cancelModal() {
    modalWrapper.classList.remove("open-modal")
}

function uptadeClick(id) {
    modalWrapper.classList.add("open-modal")
    const data = todos.find(item => item.id == id)
    modal.innerHTML = `
        <div class="uptade-wrapper">
            <strong>Uptade your wrapper</strong>
            <input value=${data.value} class="uptade-input" placeholder="Enter your todo"/>
            <button onclick="uptadeBtnClick(${id})">Uptade</button>
        </div>
    `
}

function uptadeBtnClick(id) {
    let elUptadedValue = document.querySelector(".uptade-input").value
    if (elUptadedValue == "") {
        alert("Iltimos text kiriting !")
    } else {
        const data = todos.find(item => item.id == id)
        data.value = elUptadedValue
        modalWrapper.classList.remove("open-modal")
        renderTodo(todos, list)
        window.localStorage.setItem("todos", JSON.stringify(todos))
    }
}

modalWrapper.addEventListener("click", function (e) {
    if (e.target.id == "modal-wrapper") {
        modalWrapper.classList.remove("open-modal")
    }
})

list.addEventListener("click", (e) => {
    if (e.target.matches(".checkbox-todo")) {
        const data = todos.find(item => item.id == e.target.id)
        data.isComplete = !data.isComplete
        renderTodo(todos, list)
        window.localStorage.setItem("todos", JSON.stringify(todos))
    }
})

