$(function(){
    //点击搜索按钮本地存储搜索记录
    setHistroy();
    //查询所有的本地存储
    queryHistroy();
    // 删除所有的本地存储
    clearHistroy();
    //删除本地存储记录
    deleteHistroy();
});

function setHistroy(){
    $('#search-submitButton').on('click',function(){
        //获取搜索框值
        var searchContent = $('#searchId').val().trim();
        console.log(searchContent);
        
        var historyData = localStorage.getItem('historyData');

        if(!searchContent) return;

        if(historyData) {
            historyData = JSON.parse(historyData);
        }else {
            historyData = [];
        }

        //判断本地存储中有没有内容
        if(historyData.indexOf(searchContent) == -1){
            //没有即添加到到historyData数组中。
            historyData.push(searchContent);
            //将数组转化为字符串存进本地存储
            localStorage.setItem('historyData', JSON.stringify(historyData));
        }
        queryHistroy();
        //清空输入框
        $('#searchId').val('');
    });
}

//查询本地存储记录遍历数据
function queryHistroy(){
    var historyData = localStorage.getItem('historyData');
    if(historyData) {
        historyData = JSON.parse(historyData);
    }else {
        historyData = [];
    }
    //翻转数组的值
    historyData = historyData.reverse();
    var histroyList = template('historyTemplate', {'rows': historyData});
    $('#histroyList').html(histroyList);
}

// 清空所有的本地存储记录
function clearHistroy(){
    $('#clearHistroy').on('click',function(){
        localStorage.setItem('historyData','');
        queryHistroy();
    })
}

//删除本地存储记录
function deleteHistroy(){
    $('#histroyList').on('click','.btn-delete', function(event){
        var history = $(event.target).siblings().data('history');
        var historyData = localStorage.getItem('historyData');
        historyData = JSON.parse(historyData);
        var historyIndex = historyData.indexOf(history + '');
        historyData.splice(historyIndex, 1);
        localStorage.setItem('historyData', JSON.stringify(historyData));
        queryHistroy();
    });
}
