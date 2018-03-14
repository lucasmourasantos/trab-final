var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/trab_final")
            .then(conn => global.conn = conn.db("trab_final"))
            .catch(err => console.log(err))


// #################### Sessão de Ocorrências #######################
function findOcorr(callback){
  global.conn.collection("ocorr").find({}).toArray(callback);
}

function insertOcorr(ocorr, callback){
  global.conn.collection("ocorr").insert(ocorr, callback);
}

// #################### Sessão de Viaturas #######################
function findVtr(callback){
  global.conn.collection("vtr").find({}).toArray(callback);
}

function insertVtr(vtr, callback){
    global.conn.collection("vtr").insert(vtr, callback);
}

function deleteOneVtr(id, callback){
    global.conn.collection("vtr").deleteOneVtr({_id: new ObjectId(id)}, callback);
}

// #################### Sessão de Usuários #######################
function findUser(callback){
  global.conn.collection("usuario").find({}).toArray(callback);
}

function insertUser(user, callback){
  global.conn.collection("usuario").insert(user, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOneUser(id, callback){
    global.conn.collection("usuario").find(new ObjectId(id)).toArray(callback);
}

function updateUser(id, usuario, callback){
    global.conn.collection("usuario").updateUser({_id:new ObjectId(id)}, usuario, callback);
}

function deleteOneUser(id, callback){
    global.conn.collection("usuario").deleteOneUser({_id: new ObjectId(id)}, callback);
}

module.exports = { findOcorr, insertOcorr, findVtr, insertVtr, deleteOneVtr, findUser, insertUser, findOneUser, updateUser, deleteOneUser }
