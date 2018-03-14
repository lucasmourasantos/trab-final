var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

// #################### Sessão de Ocorrências ####################
router.get('/cad_ocorr', function(req, res, next) {
  res.render('cad_ocorrencia');
});

router.post('/cad_ocorr', function(req, res, next) {
  var tipo = req.body.tipo;
  var subtipo = req.body.subtipo;
  var ende = req.body.ende;
  var bairro = req.body.bairro;
  var ptref = req.body.ptref;
  var solicitante = req.body.solicitante;
  var solic_contato = parseInt(req.body.solic_contato);

  global.db.insertOcorr({tipo, subtipo, ende, bairro, ptref, solicitante, solic_contato}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/lista_ocorr');
    })
});

router.get('/lista_ocorr', function(req, res, next) {
  global.db.findOcorr((e, docs) => {
      if(e) { return console.log(e); }
      res.render('lista/lista_ocorr', { title: 'Lista de Ocorrências', docs: docs });
  })
});

// #################### Sessão de Viaturas #######################
router.get('/cad_vtr', function(req, res, next) {
  res.render('cad_vtr');
});

router.post('/cad_vtr', function(req, res, next) {
  var prefixo = req.body.prefixo;
  var componente = req.body.componente;
  var equip = req.body.equip;
  var contato = parseInt(req.body.contato);
  var radio = parseInt(req.body.radio);

  global.db.insertVtr({prefixo, componente, equip, contato, radio}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/lista_vtr');
    })
});

router.get('/lista_vtr', function(req, res, next) {
  global.db.findVtr((e, docs) => {
      if(e) { return console.log(e); }
      res.render('lista/lista_vtr', { title: 'Lista de Viaturas', docs: docs });
  })
});

router.get('/del_vtr/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOneVtr(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/lista_user');
  });
});

// #################### Sessão de Usuário ########################
router.get('/cad_user', function(req, res) {
  res.render('cad_user', { title: 'Cadastro de Usuários', doc: {"nome":"","matricula":"","posto_grad":"","fone_fixo":"","celular":""}, action: '/cad_user' });
});

router.post('/cad_user', function(req, res, next) {
  var nome = req.body.nome;
  var matricula = req.body.matricula;
  var posto_grad = req.body.posto_grad;
  var fone_fixo = parseInt(req.body.fone_fixo);
  var celular = parseInt(req.body.celular);

  global.db.insertUser({nome, matricula, posto_grad, fone_fixo, celular}, (err, result) => {
    if(err) { return console.log(err); }
    res.redirect('/lista_user');
  })
});

router.get('/lista_user', function(req, res, next) {
  global.db.findUser((e, docs) => {
    if(e) { return console.log(e); }
    res.render('lista/lista_user', { title: 'Lista de Usuários', docs: docs });
  })
});

router.get('/edit_user/:id', function(req, res) {
  var id = req.params.id;
  global.db.findOneUser(id, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('cad_user', { title: 'Edição de Usuário', doc: docs[0], action: '/edit_user/' + docs[0]._id });
  });
})

router.post('/edit_user/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var matricula = req.body.matricula;
  var posto_grad = req.body.posto_grad;
  var fone_fixo = parseInt(req.body.fone_fixo);
  var celular = parseInt(req.body.celular);
  global.db.updateUser(id, {nome, matricula, posto_grad, fone_fixo, celular}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/lista_user');
    });
});

router.get('/del_user/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOneUser(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/lista_user');
  });
});

module.exports = router;
