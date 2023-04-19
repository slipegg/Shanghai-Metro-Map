added_line = []

var color_dic = { //颜色
    '0': '#B3B3B3',
    '1': '#CC0000',
    '2': '#009900',
    '3': '#F9E103',
    '4': '#660066',
    '5': '#CC00CC',
    '6': '#FF3265',
    '7': '#FF7F00',
    '8': '#0066CC',
    '9': '#95d3db',
    '10': '#C9A7D5',
    '11': '#800000',
    '12': '#0C785E',
    '13': '#E796C1',
    '14': '#9ba0ad',
    '15': '#b9a583',
    '16': '#77C8C7',
    '17': '#c07774',
    '18': '#d9a972',
    '19': '#84bf96',
    '20': '#f2eada',
    '21': '#69541b',
    '22': '#f0dc70',
    '23': '#525f42',
    '24': '#afdfe4',
    '25': '#11264f'
};


function add_txt() { //增加可连接节点的输入文本框等
    var new_links = document.getElementsByClassName("cs");
    var new_link = new_links[new_links.length - 1];
    var opt_str = '<option value="-1">未选择</option>\
    <option value="1">1号线</option>\
    <option value="2">2号线</option>\
    <option value="3">3号线</option>\
    <option value="4">4号线</option>\
    <option value="5">5号线</option>\
    <option value="6">6号线</option>\
    <option value="7">7号线</option>\
    <option value="8">8号线</option>\
    <option value="9">9号线</option>\
    <option value="10">10号线</option>\
    <option value="11">11号线</option>\
    <option value="12">12号线</option>\
    <option value="13">13号线</option>\
    <option value="14">浦江线</option>\
    <option value="15">15号线</option>\
    <option value="16">16号线</option>\
    <option value="17">17号线</option>\
    <option value="18">18号线</option>\
    <option value="0">磁悬浮</option>';
    for (var i = 0; i < added_line.length; i++) {
        opt_str += '<option value="' + (19 + i) + '">' + added_line[i] + '</option>';
    }

    new_link.insertAdjacentHTML('AfterEnd', '\
    <img src="./static/蓝圆.png" class="need_del">\
        <input type=text class="link_point" placeholder="可连接的站点名">\
        <div class="cs">\
            <img src="./static/蓝圆.png"> 从属地铁线:\
            <select class="new_cate" onchange="name_show()">' + opt_str + '</select>\
        <div class="fengge"></div>\
        <div class="fengge"></div>\
        </div>');
}

function addPoint() { //在变量中加入新增站点信息
    var add_point = {
        name: "",
        x: 0,
        y: 0,
        category: [],
        itemStyle: {
            color: "#ffffff",
            borderColor: "",
        },
        near_points: []
    };
    var add_line = {
        source: '',
        target: '',
        lineStyle: {
            color: ""
        }
    };
    var new_name = document.getElementById("new_name").value;
    if (get_data(new_name, file_data.data) != false) {
        alert("站名重复");
        return 0;
    }
    var new_x = document.getElementById("new_x").value;
    if (new_x == '') {
        alert('没有x坐标');
        return 0;
    }
    var new_y = document.getElementById("new_y").value;
    if (new_y == '') {
        alert('没有y坐标');
        return 0;
    }
    var new_link_point = document.getElementsByClassName("link_point");
    console.log(new_link_point);
    var new_cate = document.getElementsByClassName("new_cate");
    console.log(new_cate);
    add_point.name = new_name;
    add_point.x = parseFloat(new_x);
    add_point.y = parseFloat(new_y);
    var used_cate = [];
    add_point.itemStyle.borderColor = color_dic[new_cate[0].value];
    for (var i = 0; i < new_link_point.length; i++) {
        if (get_data(new_link_point[i].value, file_data.data) == false) {
            alert('没有该连接站点');
            return 0;
        }
        if (new_cate[i].value == '-1') {
            alert('没有选择从属地铁线');
            return 0;
        }
        var t = {};
        t[new_link_point[i].value] = parseInt(new_cate[i].value, 10);
        add_point.near_points.push(t);
        if (!is_in_list(used_cate, new_cate[i].value)) {
            add_point.category.push(parseInt(new_cate[i].value, 10));
            used_cate.push(parseInt(new_cate[i].value, 10));
        }
        var near_data = get_data(new_link_point[i].value, file_data.data);
        var temp_d = {};
        temp_d[new_name] = parseInt(new_cate[i].value, 10);
        var near_p_id = file_data.dic_p[near_data.name];
        file_data.data[near_p_id].near_points.push(temp_d);
        if (!is_in_list(file_data.data[near_p_id].category, parseInt(new_cate[i].value, 10))) {
            file_data.data[near_p_id].category.push(parseInt(new_cate[i].value, 10));
        }
    };
    if (used_cate.length == 1) {
        add_point.itemStyle.borderColor = color_dic[new_cate[0].value];
    } else {
        add_point.symbol = 'image://./static/换乘.png';
        add_point.symbolSize = 8;
    }
    file_data.dic_p[new_name] = file_data.data.length;
    file_data.data.push(add_point);


    for (var i = 0; i < new_link_point.length; i++) {
        add_line.source = new_name;
        add_line.target = new_link_point[i].value;
        add_line.lineStyle.color = color_dic[new_cate[i].value];
        var temp = deepClone(add_line);
        file_data.links.push(temp);
    }
    close_tj();
    draw();
}

function addLine() { //在变量中加入新增线路信息
    var a_new_line = document.getElementById("new_line_name").value;
    added_line.push(a_new_line);
    var temp = {
        'name': a_new_line,
        "itemStyle": {
            "color": ""
        }
    };
    file_data.categories.push(temp);
    temp.itemStyle.color = color_dic[added_line.length + 18];
    close_tj();
    draw();
}

function show_tjxl() { //展示添加线路的文本框
    document.getElementById('xl_content').style.display = 'block';
    document.getElementById('fade').style.display = 'block'
}

function show_tj() { //展示添加站点的文本框
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block'
}

function close_tj() { //关闭弹窗并清空文本框
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    document.getElementById('xl_content').style.display = 'none';
    document.getElementById('new_name').value = '';
    document.getElementById('new_x').value = '';
    document.getElementById('new_y').value = '';
    document.getElementById('new_line_name').value = '';
    lp0 = document.getElementsByClassName('need_del');
    lp = document.getElementsByClassName('link_point');
    lp2 = document.getElementsByClassName('new_cate');
    lp3 = document.getElementsByClassName('cs');
    var j = lp3.length;
    for (var i = 0; i < j - 1; i++) {
        lp0[0].remove();
        lp[0].remove();
        lp3[1].remove();
    };
}