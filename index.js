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
      var type = getRadioValue('type')

      // miniToastr[type](msg, title, timeout, cb)
      miniToastr[type](msg, title)

    }
  }

}());