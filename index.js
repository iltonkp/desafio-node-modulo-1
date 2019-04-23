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
  if (req.query.age) {
    return next()
  }

  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const idadeMinima = 18

  if (req.body.age >= idadeMinima) {
    return res.redirect(`/major?age=${req.body.age}`)
  }

  return res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', ageMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)
