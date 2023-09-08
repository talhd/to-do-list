const form = document.getElementById("form");
const input = document.getElementById("input_box");
const list = document.getElementById("list");

loadItems();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value !== "") {
        newItem();
        input.value = "";
    }
});

function newItem() {
    const div = document.createElement("div");
    const newContent = document.createElement("p");
    newContent.textContent = input.value;
    addEventListenersToDiv(div);
    div.id = "list_node";
    div.appendChild(newContent);
    list.appendChild(div);
    saveItems();
}

function saveItems() {
    const items = [];
    const nodeList = list.childNodes;

    for (const node of nodeList) {
        if (node.nodeType === 1) {
            items.push({
                content: node.textContent,
                completed: node.classList.contains('completed')
            });
        }
    }

    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItems() {
    const storedItems = localStorage.getItem('todoItems');

    if (storedItems) {
        const items = JSON.parse(storedItems);

        for (const storedItem of items) {
            const div = document.createElement("div");
            const newContent = document.createElement("p");
            newContent.textContent = storedItem.content;
            div.appendChild(newContent);
            div.className = storedItem.completed ? "completed" : "";
            addEventListenersToDiv(div);
            div.id = "list_node";
            list.appendChild(div);
        }
    }
}

function addEventListenersToDiv(div) {
    div.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        div.remove();
        saveItems();
    });

    div.addEventListener("click", function(e) {
        e.preventDefault();
        div.classList.toggle('completed');
        saveItems();
    });
}
