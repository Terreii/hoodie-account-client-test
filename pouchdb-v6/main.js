var PouchDB = require('pouchdb')
var Hoodie = require('@hoodie/client')

var hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: PouchDB
})

window.PouchDB = PouchDB
window.hoodie = hoodie

var username = document.getElementById('username')
var password = document.getElementById('password')
var accountOutput = document.getElementById('accountOut')

accountOutput.innerHTML = 'PouchDB version: ' + PouchDB.version

document.getElementById('signup').addEventListener('click', function (event) {
  event.preventDefault()

  var data = {
    username: username.value,
    password: password.value
  }

  hoodie.account.signUp(data)
    .then(
      function (prop) {
        accountOutput.innerHTML = 'did sign up <br />' + JSON.stringify(prop)
      },
      function (err) {
        accountOutput.innerHTML = 'error: <br />' + err.toString()
      }
    )
})

document.getElementById('signin').addEventListener('click', function (event) {
  event.preventDefault()

  var data = {
    username: username.value,
    password: password.value
  }

  hoodie.account.signIn(data)
    .then(
      function (prop) {
        accountOutput.innerHTML = 'did sign in <br />' + JSON.stringify(prop)
      },
      function (err) {
        accountOutput.innerHTML = 'error: <br />' + err.toString()
      }
    )
})

document.getElementById('addDoc').addEventListener('submit', function (event) {
  event.preventDefault()
  var value = event.target.children.textInput.value
  event.target.children.textInput.value = ''
  
  hoodie.store.add({ text: value })
    .then(
      console.log.bind(console, 'did add doc'),
      console.error.bind(console, 'error by adding doc')
    )
})

var docsOutput = document.getElementById('output')
function handleDocOutput () {
  hoodie.store.findAll()
    .then(function (docs) {
      docsOutput.innerHTML = docs.reduce(function (all, doc) {
        return all + '<li>' + doc.text + '</li>'
      }, 'All docs: <ul>') + '</ul>'
    })
}
handleDocOutput()

hoodie.store.on('change', function () {
  handleDocOutput()
})
