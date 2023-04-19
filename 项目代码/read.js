var inputElement = document.getElementById("files");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() { //读取文件
    var selectedFile = document.getElementById("files").files[0]; //获取读取的File对象
    var name = selectedFile.name; //读取选中文件的文件名
    var size = selectedFile.size; //读取选中文件的大小
    console.log("文件名:" + name + "大小：" + size);
    var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile); //读取文件的内容

    reader.onload = function() {
        file_data = eval("(" + this.result + ")");
        draw();
        find_path();
    };
}