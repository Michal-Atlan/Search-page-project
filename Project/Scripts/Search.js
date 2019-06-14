var RepItems = "";//save web api result for not call every time.

$(document).ready(function () {
    // when clicking on the button  or on entering key, perform search action.
    $("#RepositoryName").on('keypress', function (e) {
        if (e.which == 13) {
            Search();
        }
    });

    $("#Search").click(function () {
        Search();
    });

})
// a function that does request to web API to get results according to user keyword.
function Search() {
    var YOUR_SEARCH_KEYWORD = $("#RepositoryName").val();
    if (YOUR_SEARCH_KEYWORD == "") {
        alert("Type the repository you would like to search!")
        return;
    }
    $.ajax({
        type: "Get",
        url: "https://api.github.com/search/repositories?q=" + YOUR_SEARCH_KEYWORD,
        async: false,
        success: function (res) {
            CreateRepTable(res);
        },
        error: function (res) {
            result = "error";
        }
    });
}
// a function that builds the gallery of the items(if got results from WEB API)
function CreateRepTable(res) {

    var RefItemsLength = res.items.length;
    RepItems = res.items;
    if (RefItemsLength == 0) {
        alert("No Repository Like Your's Search.");
    } else {
        var th = document.querySelectorAll('#table th');//To check whether `TD` is appended in table or not!
        if (!th.length) {
            //If not appended, then append TD in table
            var rows = "<th>Repository name</th><th>Avatar of the owner </th><th></th>";
            var table = document.createElement('table');
            table.innerHTML = rows;
            document.getElementById("table").appendChild(table.firstChild);
        }

        for (var i = 0; i < RefItemsLength; i++) {
            var elems = '';
            elems += "<tr><td><input type='text' name='" + "name".concat(i + 1) + "' value = '" + RepItems[i].name + "' ></td><td><input type='text' name='" + "avatar of the owner".concat(i + 1) + "' value ='" + RepItems[i].owner.avatar_url + "'></td><td><input type='button' style='background-color:lightcoral'  id='" + RepItems[i].id + "' value = 'Click me!!' onclick='addRepToSession(this.id);' name='" + "idOfRep".concat(i + 1) + "'></td></tr>";
            var table = document.createElement('table');
            table.innerHTML = elems;
            document.getElementById("table").appendChild(table.firstChild);
        }
    }
}
// a function that is executed every time that user clicked on "click me" button.
function addRepToSession(idRep) {

    var item = null;
    for (i = 0; i < RepItems.length; i++) {// find the item that bookmarked according to item id.
        if (RepItems[i].id == idRep) {
            item = RepItems[i];
            break;
        }
    }
    //send this item to the server for adding it to session.
    $.ajax({
        url: "Home/AddRepToSession",
        type: "POST",
        data: { idRep: idRep, RepositorynName: item.name, ownerAvatar: item.owner.avatar_url },
        success: function (res) {
            alert("Bookmarked!!")
        },
        error: function () {

        }
    })
}
//a function that returns the bookmarked items from the session.
function displayBookMarkedRepositories() {
    $.ajax({
        url: "GetRepsFromSession",
        type: "GET",
        //dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (res) {
            if (res.repItems.length > 0)
                createBookMarkedRep(res);
        },
        error: function (res) {
            alert("Error - no session rep");
        }
    })
}
// a function that creates table only with bookmarked items.
function createBookMarkedRep(res) {
    var items = res.repItems;
    var th = document.querySelectorAll('#table th');//To check whether `TD` is appended in table or not!
    if (!th.length) {
        //If not appended, then append TD in table
        var rows = "<th>Repository name</th><th>Avatar of the owner </th>";
        var table = document.createElement('table');
        table.innerHTML = rows;
        document.getElementById("table").appendChild(table.firstChild);
    }
    for (var i = 0; i < items.length; i++) {
        var elems = '';
        elems += "<tr><td><input type='text'  value = '" + items[i].RepositorynName + "' ></td><td><input type='text'  value ='" + items[i].ownerAvatar + "'></td></tr>";
        var table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("table").appendChild(table.firstChild);
    }
}




