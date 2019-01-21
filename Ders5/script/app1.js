// jQuery, UI tarafında hiçbir JS kodu yazılmamasını sağlıyor.

var todoList = [];
$(function () {
    $("#liste2").on("drop", drop).on("dragover", allowDrop);
    $("#btnekle").click(function () {
        var txt = $("#txtyeni");
        var yeni = txt.val();
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
        txt.val("");
        txt.focus();
        kaydet();
        listele();
    });

    function listele() {
        //localde data var ise onu cekelim
        var localListem = localStorage.getItem("listem")
        if (localListem != null) {
            todoList = JSON.parse(localListem);
        }

        $("#liste,#liste2").empty();
        for (var i = 0; i < todoList.length; i++) {
            var element = todoList[i];
            var btn = document.createElement("button");
            $(btn).attr("type", "button").attr("name", element.id).addClass("list-group-item").addClass("list-group-item-action").attr("id", "btn" + (i + 1));
            if (element.isDone && !element.isDeleted) {
                $(btn).html("<span class='yapildi'>" + element.text + "</span>");
                $(btn).on("click", sil);
                $("#liste2").append(btn);
            } else if (!element.isDone && !element.isDeleted) {
                $(btn).attr("draggable", "true").on("dragstart", surukle).text(element.text).on("click", yapildi).appendTo($("#liste"));
            }
        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function surukle(ev) {
        ev.originalEvent.dataTransfer.setData("td", ev.target.id);

    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.originalEvent.dataTransfer.getData("td");
        //ev.target.appendChild(document.getElementById(data));
        var id = document.getElementById(data).name;
        id = parseInt(id);
        yapildi(id);
    }

    function yapildi(did) {
        var id = this.name;
        if (did != null && typeof (did) === typeof (3)) {
            id = did;
        }
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
        }
        $(btn).fadeOut(500);
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
        $(btn).fadeOut(500, function () {
            $(btn).remove();
            kaydet();
            listele();
        });
    }
    listele();
});