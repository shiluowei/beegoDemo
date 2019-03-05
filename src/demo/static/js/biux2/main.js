// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

option = {
    title : {
        text: '学生性别分析',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:echarts_data_pie_items,
    },
    series : [
        {
            name: '性别',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: echarts_data_pie_items_data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);