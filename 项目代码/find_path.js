var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);

function LinkedQueue() { //队列
    var Node = function(ele, value, line, past_point, change_sum) { //队列节点
        this.ele = ele; //站点
        this.value = value; //代价值
        this.line = line; //运行所在线路
        this.past_point = past_point; //过去经历节点
        this.change_sum = change_sum; //换乘次数
        this.next = null; //下一节点
    }

    var length = 0,
        front, //队首指针
        rear; //队尾指针
    this.push = function(ele, value, line, past_point, change_sum) { //放入节点
        var node = new Node(ele, value, line, past_point, change_sum),
            temp;

        if (length == 0) {
            front = node;
        } else {
            temp = rear;
            temp.next = node;
        }
        rear = node;
        length++;
        return true;
    }

    this.pop = function() { //弹出节点
        var temp = front;
        front = front.next;
        length--;
        //temp.next = null
        return temp.ele;
    }

    this.size = function() { //得到长度
        return length;
    }
    this.getFront = function() { //获取头结点
        return front;
    }
    this.getRear = function() { //获取尾结点
            return rear;
        }
        // this.toString = function() {//
        //     var string = '',
        //         temp = front;
        //     while (temp) {
        //         string += temp.ele + ' ';
        //         temp = temp.next;
        //     }
        //     return string;
        // }
    this.clear = function() { //清空
        front = null;
        rear = null;
        length = 0;
        return true;
    }
    this.sort = function() { //排序
        var temp = front;
        for (var i = front; i != null; i = i.next) {
            for (var j = i.next; j != null; j = j.next) {
                if (j.value < i.value) {
                    var t = deepClone(i);
                    i.ele = deepClone(j.ele);
                    i.value = deepClone(j.value);
                    i.line = deepClone(j.line);
                    i.past_point = deepClone(j.past_point);
                    i.change_sum = deepClone(j.change_sum);
                    j.ele = deepClone(t.ele);
                    j.value = deepClone(t.value);
                    j.line = deepClone(t.line);
                    j.past_point = deepClone(t.past_point);
                    j.change_sum = deepClone(t.change_sum);
                }
            }
        }
    }
    this.pop_m = function() { //获取代价值节点，最小的接地那
        var tm = front;
        for (var i = front; i != null; i = i.next) {
            if (i.value < tm.value) {
                tm = i;
            }
        }
        if (front == tm) {
            front = front.next;
        } else {
            var h = front;
            while (true) {
                if (h.next == tm) {
                    h.next = tm.next;
                    if (h.next == null) {
                        rear = h;
                    }
                    break;
                }
                h = h.next;
            }
        }
        length--;
        return tm;
    }
    this.show = function() { //展示
        var t = front;
        var s = '栈中内容：\n'
        while (t != null) {
            s = s + t.ele.name + t.value + "--"
            t = t.next;
        }
        console.log(s);
    }
}

function is_in_list(list, a) { //a是否在list中
    for (var i = 0; i < list.length; i++) {
        if (list[i] == a) {
            return true;
        }
    }
    return false;
}

function get_same_list(a, b) { //得到2个list中的相同值
    var same_line = [];
    for (var i = 0; i < b.length; i++) {
        if (is_in_list(a, b[i])) {
            same_line.push(b[i]);
        }
    }
    return same_line;
}

function get_same_line(a_dic, b_list, c_name) { //得到a_dic中key与c_name相同的在b_list中的值
    var t = [];
    for (var i = 0; i < a_dic.length; i++) {
        if (Object.keys(a_dic[i]) == c_name) {
            t.push(a_dic[i][c_name]);
        }
    }
    return get_same_list(t, b_list);
}

function get_all_key(a) { //得到字典a所以的key
    var t = [];
    for (var i = 0; i < a.length; i++) {
        var is_same = 0;
        for (var j = 0; j < t.length; j++) {
            if (Object.keys(a[i])[0] == t[j]) {
                is_same = 1;
                break;
            }
        }
        if (!is_same) {
            t.push(Object.keys(a[i])[0]);
        }
    }
    return t;
}

function get_data(name, data) { //得到名为name的data的节点
    for (var i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            return data[i];
        }
    }
    return false;
}

function get_line(a_name, b_name) { //得到起始为a_name, b_name的连线
    for (var i = 0; i < file_data.links.length; i++) {
        console.log(file_data.links[i].source);
        if ((file_data.links[i].source == a_name && file_data.links[i].target == b_name) || (file_data.links[i].source == b_name && file_data.links[i].target == a_name)) {
            return file_data.links[i];
        }
    }
    return false;
}

function get_path_lines(path_line) { //得到路径中每一点需要经过的站点
    var res = [];
    var temp = path_line[0];
    for (var i = 0; i < path_line.length - 1; i++) {
        if (path_line[i].length == 1) {
            res.push(path_line[i][0]);
        } else {
            var j = i;
            while (path_line[i].length != 1 && i < path_line.length - 1) {
                i++;
            }
            if (i < path_line.length - 1) {
                var s_l = get_same_list(path_line[i - 1], path_line[i]);
                if (s_l.length == 1) {
                    while (j <= i) {
                        res.push(s_l[0]);
                        j++;
                    }
                } else { //0
                    while (j <= i) {
                        res.push(path_line[i - 1][0]);
                        j++;
                    }
                }
            } else {
                while (j != i) {
                    res.push(path_line[i - 1][0]);
                    j++;
                }
            }
        }
    }
    return res;
}

function show_path(path) { //展示路径
    //展示地图中的路径图
    var path_name = Object.keys(path);
    var path_line = Object.values(path);
    var p_l = get_path_lines(path_line);
    console.log('p_l', p_l);
    var link = [];
    var a_link = {
        "source": "",
        "target": "",
        "lineStyle": {
            "color": ""
        }
    };
    for (var i = 0; i < p_l.length; i++) {
        var t = deepClone(a_link);
        t.source = path_name[i];
        t.target = path_name[i + 1];
        t.lineStyle.color = color_dic[p_l[i]];
        link.push(t);
    };
    var show_path_data = [];
    for (var i = 0; i < path_name.length; i++) {
        var t = get_data(path_name[i], f_data);
        if (i == path_name.length - 1) {
            t.itemStyle.borderColor = color_dic[p_l[i - 1]];
        } else {
            t.itemStyle.borderColor = color_dic[p_l[i]];
        }
        show_path_data.push(t);
    };
    console.log('link', link);
    draw2(show_path_data, link);

    //展示左边框中的结果
    var res = document.getElementById("res");
    if (res != null) {
        res.remove();
    }
    var div = document.getElementById("result");
    div.insertAdjacentHTML('beforeEnd', '<div id="res" >' + "</div>")
    var res_h = 15 * show_path_data.length;
    document.getElementById("res").style.height = res_h + "px";
    var dd = document.getElementById('res');
    var dd_myChart = echarts.init(dd);
    var dd_data = deepClone(show_path_data);
    for (var i = 0; i < dd_data.length; i++) {
        dd_data[i].x = 10;
        dd_data[i].y = i * 10;
        if (i > 0 && i < dd_data.length - 1) {
            if (p_l[i] != p_l[i - 1]) {
                dd_data[i].symbol = 'image://./static/换乘.png';
                dd_data[i].symbolSize = 8;
            } else {
                dd_data[i].symbol = '';
                dd_data[i].symbolSize = 3;
            }
        } else {
            dd_data[i].symbol = '';
            dd_data[i].symbolSize = 3;
        }
    }
    var need_s = dd_data.length - 1
    var dd_option = { //绘制选项
        title: {
            text: '共需要' + need_s + '站',
        },
        series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: false
            },
            edgeSymbolSize: [4, 10],
            data: dd_data,
            links: link,
            shou: true,
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0.5,
            },
            symbolSize: 3, //节点大小为17
            itemStyle: { //给所有节点的类型一个默认样式，特殊的可在其节点下单独修改样式
                color: "#00ffff", //颜色默认白色
                borderColor: "#009900" //边框默认绿色
            },
            label: {
                show: true,
                position: 'right', //['50%', '50%'], //
            },
            lineStyle: {
                width: 4,
            },
            scaleLimit: {
                min: 0.8,
                max: 10
            },
        }]
    };
    dd_option && dd_myChart.setOption(dd_option);
}

function find_path(param) { //找到路径
    var start_name = document.getElementById("start_p").value; //得到起始站名字
    if (get_data(start_name, file_data.data) == false) {
        alert("没有此起始站");
        return 0;
    }
    var end_name = document.getElementById("end_p").value;
    if (get_data(end_name, file_data.data) == false) {
        alert("没有此终点站");
        return 0;
    }
    var past_point = {};
    var value = 0;
    var change_sum = 0;
    var change_dic;
    if (param == 0) {
        change_dic = { 0: 0, 1: 2, 2: 3, 3: 4, 4: 5, 5: 7, 6: 9 } //较便捷
    } else {
        change_dic = { 0: 0, 1: 100, 2: 300, 3: 500, 4: 1000, 5: 1000, 6: 1000 } //少换乘
    }

    var p_dic = file_data.dic_p; //站点名与下标的字典
    var p_list = new LinkedQueue(); //初始化队列
    var now_p = file_data.data[p_dic[start_name]]; //现在遍历的站点
    var past_line = now_p.category; //现在乘坐的线路
    var used_point = []; //遍历过的非换乘节点
    while (now_p.name != end_name) { //直到达到终点站就结束
        value = value + 1; //代价值+1
        var p_next = get_all_key(now_p.near_points); //得到现在站点的所有的附近站点
        if (now_p.category.length == 1) { //如果不是换乘站
            used_point.push(now_p.name);
        }
        for (var i = 0; i < p_next.length; i++) { //遍历所有的周围站点
            if (p_next[i] == '哈哈哈') {
                console.log(p_next[i]);
            }
            if ((!is_in_list(Object.keys(past_point), p_next[i])) && (!is_in_list(used_point, p_next[i]))) { //必须不在经过的站点和所有遍历过的非换乘站点
                //克隆一部分数据
                var p_p = deepClone(past_point);
                var c_s = change_sum;
                var va = value;
                var same_line = get_same_line(now_p.near_points, past_line, p_next[i]); //查看从现在的线路如何到达该相邻站点，从而判断是否要换乘
                if (same_line.length == 0) { //不能到达，要换乘
                    c_s += 1; //换乘值+1
                    va = va + change_dic[c_s]; //代价加上对应代价
                    same_line = get_same_line(now_p.near_points, now_p.category, p_next[i]); //重新判断换乘到哪个线路
                }
                if (c_s <= 6) { //在换乘限制内
                    //压入节点
                    p_p[now_p.name] = same_line;
                    p_list.push(file_data.data[p_dic[p_next[i]]], va, same_line, p_p, c_s);
                }
            }
        }
        //更新现在站点的信息
        var now_m = p_list.pop_m();
        now_p = now_m.ele;
        past_line = now_m.line;
        value = now_m.value;
        past_point = now_m.past_point;
        change_sum = now_m.change_sum;
    }
    past_point[now_p.name] = [];
    show_path(past_point); //展示线路
}