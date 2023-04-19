function deepClone(target) { // 定义一个深拷贝函数  接收目标target参数
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}

function draw() { //通过默认变量绘制线路图
    console.log('test:', file_data)
    f_data = deepClone(file_data.data);
    console.log(f_data);

    for (var i = 0; i < file_data.data.length; i++) {
        f_data[i].category = file_data.data[i].category[0];
    }
    console.log(f_data);
    option = {

        tooltip: {},
        legend: [{
            // selectedMode: 'single',
            show: true,
            width: 750,
            selectedMode: false,
            right: 400,
            backgroundColor: 'rgba(25,25,25,0.1)'
        }],
        //animationDurationUpdate: 1500,
        //animationEasingUpdate: 'quinticInOut',
        series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: false
            },
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            categories: file_data.categories,
            data: f_data,
            links: file_data.links,

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
            labelLayout: {
                hideOverlap: true
            },
            lineStyle: {
                width: 4,
            },
            scaleLimit: {
                min: 0.8,
                max: 10
            },

            /*dispatchAction({
                type: "focusNodeAdjacency",
                // 使用 seriesId 或 seriesIndex 或 seriesName 来定位 series.
                seriesId: '1',
                seriesIndex: 0,
                seriesName: 'nnn',
                // 使用 dataIndex 来定位节点。
                dataIndex: 12
            })
            /*
                emphasis: {//聚焦
                    focus: 'adjacency',
                    lineStyle: {
                        width: 5
                    
    }
        }*/

        }]
    };
    option && myChart.setOption(option);
    /*myChart.on('click', function(params) {
        // 在用户点击后控制台打印数据的名称
        console.log(params.name);
    });*/
}

function draw2(show_path_data, show_path_line) { //通过参数绘制线路
    option = {
        legend: [{
            // selectedMode: 'single',
            show: true,
            width: 750,
            selectedMode: false,
            right: 400,
            backgroundColor: 'rgba(25,25,25,0.1)'
        }],
        //animationDurationUpdate: 1500,
        //animationEasingUpdate: 'quinticInOut',
        series: [{
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: false
            },
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            categories: file_data.categories,
            data: show_path_data,
            links: show_path_line,

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
            labelLayout: {
                hideOverlap: true
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
    option && myChart.setOption(option);
    myChart.on('click', function(params) {
        // 在用户点击后控制台打印数据的名称
        var div = document.getElementById('res');
        div.remove();
        var sp = document.getElementById('start_p');
        sp.value = '';
        var ep = document.getElementById('end_p');
        ep.value = '';
        draw();
    });
}