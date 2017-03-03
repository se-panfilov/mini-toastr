var indexPage = (function () {
  miniToastr.init()

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

      if (isIcon) {
        miniToastr.setIcon('error', 'i', 'fa fa-warning')
        miniToastr.setIcon('warn', 'img', null, {'src': 'assets/img/demo-warn.png'})
        miniToastr.setIcon('info', 'i', 'fa fa-info-circle')
        miniToastr.setIcon('success', 'i', 'fa fa-check-circle-o')
      }

      miniToastr[type](msg, title, +timeout)

    }
  }

}());