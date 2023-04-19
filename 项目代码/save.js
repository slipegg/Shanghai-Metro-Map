var button = document.getElementById("export");
button.addEventListener("click", saveHandler, false);

function saveHandler() { //保存文件
    let data = {
        name: "hanmeimei",
        age: 88
    }
    var content = JSON.stringify(file_data);
    var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "save.json");
}