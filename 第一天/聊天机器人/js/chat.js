$(function(){
    //初始化右侧滚动条
    resetui();

    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function(){
      var text = $('#ipt').val().trim();
      if (text.length <= 0) return $('#ipt').val('')
      //如果输入了聊天内容，则追加到页面中显示
      $('#talk_list').append(`<li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
          </li>`)
      $('#ipt').val('')
      //重置滚动条
      resetui()
      //发起请求获取聊天内容
      getMsg(text);
    })


  //获取聊天机器人发送回来的消息
  function getMsg (text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',//synthesize
      data: {
        spoken: text
      },
      success: function (res) {
        console.log(res);
        if (res.message === 'success'){
          //接受聊天消息
          var msg = res.data.info.text;
          $('#talk_list').append(`<li class="left_word">
            <img src="img/person01.png" /> <span>${msg}</span>
          </li>`)
          resetui()
          //调用getVoice函数把文本转化为语音
          getVoice(msg)
        }
      }
    })
  }

  //把文字转化为语音进行播放
  function getVoice(text){
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function(res){
        if (res.status === 200){
          //播放语音
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  //绑定回车键
  $('#ipt').on('keydown',function(e){
    if(e.keyCode === 13){
      $("#btnSend").click();
    }
  })
})