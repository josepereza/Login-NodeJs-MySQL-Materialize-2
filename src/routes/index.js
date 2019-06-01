const express = require('express');
const expressRouter = express.Router();
const { isLoggedIn } = require('../lib/helper_auth');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('you_apikey');

expressRouter.get('/', isLoggedIn, (req, res) => {
    res.render('index');
});

expressRouter.get('/news', isLoggedIn, (req, resul, next) => {
  let busqueda="general";
  let pais="de";
  let pagina=1;
   
    
    newsapi.v2.everything({
        q: 'general',
        language: 'de',
        page: 1
      }).then(res=>{
          //console.log(res.articles[2].title);
          console.log(res.articles);
        var news2= res.articles;
        resul.render('apinews', { news2,busqueda,pais,pagina })
       
          
        
      })
    .catch(function(error) {
      console.log(error)
    })
    
});

expressRouter.post('/buscar', isLoggedIn, (req, resul, next) => {
    let busqueda=req.body.busqueda;
    let pais=req.body.pais;
    let pagina=req.body.pagina;
    newsapi.v2.everything({
        q: busqueda,
        language: pais,
        page: pagina
      }).then(res=>{
          console.log(res.articles[2].title);
        var news2= res.articles;
        resul.render('apinews', { news2,busqueda,pais,pagina })
        console.log(res.articles);
          
        
      })
    .catch(function(error) {
      console.log(error)
    })
    
});



module.exports = expressRouter;