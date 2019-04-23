const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const ageMiddleware = (req, res, next) => {
  const { age } = req.query

  if (age) {
    return next()
  }

  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const idadeMinima = 18
  const { age } = req.body

  if (age >= idadeMinima) {
    return res.redirect(`/major?age=${age}`)
  }

  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', ageMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age: age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age: age })
})

app.listen(3000)
