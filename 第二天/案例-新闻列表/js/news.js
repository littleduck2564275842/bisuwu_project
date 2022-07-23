$(function(){
  //定义格式化时间过滤器
  template.defaults.imports.dateFormat = function(dtstr){
    var dt = new Date(dtstr);
    var y = dt.getFullYear()
    y = y < 10 ? '0' + y : y
    var m = dt.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = dt.getDate()
    d = d < 10 ? '0' + d : d
    
    var hh = dt.getHours()
    hh = hh < 10 ? '0' + hh : hh
    var mm = dt.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    var ss = dt.getSeconds()
    ss = ss < 10 ? '0' + ss : ss
    
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  //获取新闻列表的函数
  function getNewsList(){
    $.get('http://www.liulongbin.top:3006/api/news',function(res){
      if(res.status !== 200){
        return alert('获取新闻列表数据失败')
      }
      for(var i = 0; i < res.data.length; i++){
        //把每一项的tags属性从字符串改成数组
        res.data[i].tags = res.data[i].tags.split(',')
      }
      var htmlStr = template('tpl-news',res)
      $('#news-list').html(htmlStr);
    })
  }
  getNewsList()
})