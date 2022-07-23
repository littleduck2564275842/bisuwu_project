
//声明处理函数
function resolveData (data) {
  var arr = []
  for (const k in data) {
    var str = k + '=' + data[k]
    arr.push(str)
  }
  return arr.join("&")
}


function myAjax (option) {
  var xhr = new XMLHttpRequest();
  var qs = resolveData(option.data)
  xhr.timeout = 30;
  xhr.ontimeout = function(){
    alert('请求超时！')
  }
  if (option.method.toUpperCase() === 'GET') {
    xhr.open(option.method, option.url + '?' + qs)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log("GET请求成功");
        var result = JSON.parse(xhr.responseText)
        option.success(result)
      }
    }
  } else if (option.method.toUpperCase() === 'POST') {
    xhr.open(option.method, option.url)
    //设置post请求的编码格式
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log("POST请求成功");
        var result = JSON.parse(xhr.responseText)
        option.success(result)
      }
    }
  }
  

}