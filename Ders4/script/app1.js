var todoList = [];

function ekle() {
    var txt = document.getElementById("txtyeni");
    var yeni = txt.value;
    if (yeni === "") {
        return;
    }
    var eklenecek = {
        id: todoList.length + 1,
        text: yeni,
        isDone: false,
        isDeleted: false
    }
    todoList.push(eklenecek);
    txt.value = "";
    txt.focus();
    kaydet();
    listele();
}

function listele() {
    //localde data var ise onu cekelim
    var localListem = localStorage.getItem("listem")
    if (localListem != null) {
        todoList = JSON.parse(localListem);
    }


    var yapilacaklarDiv = document.getElementById("liste");
    while (yapilacaklarDiv.firstChild) {
        yapilacaklarDiv.removeChild(yapilacaklarDiv.firstChild);
    }
    var yapilanlarDiv = document.getElementById("liste2");
    while (yapilanlarDiv.firstChild) {
        yapilanlarDiv.removeChild(yapilanlarDiv.firstChild);
    }
    for (var i = 0; i < todoList.length; i++) {
        var element = todoList[i];
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("name", element.id);
        btn.setAttribute("class", "list-group-item list-group-item-action");
        btn.setAttribute("id", "btn" + (i + 1));
        if (element.isDone && !element.isDeleted) {
            btn.innerHTML = "<span class='yapildi'>" + element.text + "</span>";
            btn.addEventListener("click", sil);
            yapilanlarDiv.appendChild(btn);
        } else if (!element.isDone && !element.isDeleted) {
            btn.setAttribute("draggable", "true");
            btn.addEventListener("dragstart", surukle);
            btn.innerText = element.text;
            btn.addEventListener("click", yapildi);
            yapilacaklarDiv.appendChild(btn);
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function surukle(ev) {
    ev.dataTransfer.setData("td", ev.target.id);

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("td");
    //ev.target.appendChild(document.getElementById(data));
    var id = document.getElementById(data).name;
    yapildi(id);
}

function yapildi(did) {
    var id = this.name;
    if (did != null && typeof (did) === typeof (3)) {
        id = did;
    }
    console.log(id);
    
    for (var i = 0; i < todoList.length; i++) {
        var element = todoList[i];
        if (element.id == id) {
            element.isDone = true;
            break;
        }
    }

    var btn = this;
    if (did != null && typeof (did) === typeof (3)) {
        btn = document.getElementById("btn" + did);
        console.log("girdi");

    }
    var opak = 1;
    setInterval(function () {
        opak *= 0.8;
        btn.style.opacity = opak < 0 ? 0 : opak;
    }, 50);
    setTimeout(function () {
        // console.log("500ms bekledik");
        kaydet();
        listele();
    }, 800);
}

function sil() {
    var id = this.name;
    for (var i = 0; i < todoList.length; i++) {
        var element = todoList[i];
        if (element.id == id) {
            element.isDeleted = true;
            break;
        }
    }
    var btn = this;
    var opak = 1;
    setInterval(function () {
        opak *= 0.8;
        btn.style.opacity = opak < 0 ? 0 : opak;
    }, 50);
    setTimeout(function () {
        // console.log("500ms bekledik");
        kaydet();
        listele();
    }, 800);
}

function kaydet() {
    var tempArray = [];
    var id = 1;
    for (var i = 0; i < todoList.length; i++) {
        var element = todoList[i];
        if (!element.isDeleted) {
            element.id = id;
            tempArray.push(element);
            id++;
        }
    }
    todoList = tempArray;
    window.localStorage.setItem("listem", JSON.stringify(todoList));

}