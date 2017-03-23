var indexPage = (function () {
  miniToastr.init({
    timeout: 500
  })

  function getRadioValue (name) {
    var elements = document.getElementsByName(name)
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        return elements[i].value
      }
    }
  }

  return {
    showToast: function () {
      var title = document.getElementById('title').value
      var msg = document.getElementById('msg').value
      var timeout = document.getElementById('timeout').value
      var type = getRadioValue('type')
      var isIcon = document.getElementById('is_icon').checked

      miniToastr.config.icons = {}
      // miniToastr.config.timeout = 10000

      if (isIcon) {
        miniToastr.setIcon('error', 'i', {'class': 'fa fa-warning'})
        miniToastr.setIcon('warn', 'img', {src: 'assets/img/demo-warn.png', style: 'vertical-align: bottom;'})
        miniToastr.setIcon('info', 'i', {'class': 'fa fa-info-circle'})
        miniToastr.setIcon('success', 'i', {'class': 'fa fa-check-circle-o'})
      }

      miniToastr.error(msg, title)
      miniToastr[type](msg, title, +timeout)
      miniToastr.info(msg, title)

    }
  }

}());