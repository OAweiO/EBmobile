$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    // 获取分类列表
    getCategoryNav();
    //点击分类列表获取商品类别
    getCategoryGoods();
    //以便一进入就获取
    getDefaultGoods(1);
});

function getCategoryNav(){
    $.ajax({
        type: 'GET',
        url: '/category/queryTopCategory',
        success: function(backData){
            var data = template('getCategoryNav', backData); 
            $('#dynamicGetCategoryNav').html(data).children('li').eq(0).addClass('select_nav_cur');
        }
    });
}
function getCategoryGoods(){
    $('#dynamicGetCategoryNav').on('click',function(event){
        // console.log(event.target.dataset.id);
        $(event.target).addClass('select_nav_cur').siblings().removeClass('select_nav_cur');
        getDefaultGoods(event.target.dataset.id);
    });
}
// 封装一个函数，以便一进入就获取
function getDefaultGoods(categoryId){
    $.ajax({
        type: 'GET',
        url: '/category/querySecondCategory',
        data:{
            id: categoryId
        },
        success: function(backData){
            // console.log(backData);
            var data = template('getCategoryGoods', backData);   
            dynamicData = backData.rows.length == 0 ? '<p style="margin-top: 16px;">暂无此商品</p>' : data;
            $('#dynamicGetCategoryGoods').html(dynamicData);
        }
    });
}
