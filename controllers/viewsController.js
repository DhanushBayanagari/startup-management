const sql = require("mysql");
const jwt = require('jsonwebtoken');
const db = sql.createConnection({
  host: "localhost",
  user: "madakari",
  password: "Oo(6D.Ei]@BllnO9",
  database: "dbmsmini",
});
const express = require("express");
const { response } = require("../app");
let user;
let id;
exports.base = (req, res) => {
  if (req.cookies.jwt) {
   id=jwt.verify(
    req.cookies.jwt,
    "dbmsminiproject@5thsem@cse@cmrit$bengalore&karnataka",
    function (err, decoded)

    { if(err)
      {
        res.status(200).render('login');
      }
        return decoded.id;   
    }
  );
  }
 
  const qry= `SELECT * FROM USER WHERE id=${id}`
  db.query(qry, (err, response) => {
    
    if(response)
    {
      
      res.status(200).render("base", { response });}
    else
    {
      res.status(200).render("login");
    }
    
  });
  
  
};

exports.chat = (req, res) => {
  const qry = `SELECT * FROM QUERY q, QUERYMN qm, USER u WHERE  q.Qid=qm.Qid and qm.uid=u.id`;
  db.query(qry, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.status(200).render("chat", { response });
  });
};
exports.create = (req, res) => {
  res.status(200).render("createStartup");
};
exports.login = (req, res) => {
  res.status(200).render("login");
};
exports.signup = (req, res) => {
  res.status(200).render("signup");
};
exports.query = (req, res) => {
  res.status(200).render("query");
};
exports.location = (req, res) => {
  const sid = req.params.sid;
  res.status(200).render("location", { sid });
};
exports.viewStartup = (req, res) => {
  const qry = `SELECT * FROM USER u , STARTUP s WHERE u.id=s.FrmID`;
  db.query(qry, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.status(200).render("viewStartup", { response });
  });
};
exports.updateStartup = (req, res) => {
  const Sid = req.params.Sid;
  res.status(200).render("select", { Sid });
};

exports.viewSelectedStartup = (req, res) => {
  
  const qry = `SELECT * FROM USER u ,STARTUP s WHERE u.id=s.FrmID `;
  db.query(qry, (err, response) => {
    if (err) {
      console.log(err);
    }
    
    res.status(200).render("selectedStartup", { response });

  });
};
exports.makeAgreement= (req,res)=>
{
  const sId =req.params.sId
  const email=req.params.email
  res.status(200).render("makeAgreement",{sId,email})
}
exports.acceptAgreement=(req,res)=>
{
  const Sid=req.params.Sid
  const aId=req.params.aId
  res.status(200).render("acceptDeal",{Sid,aId})
}
exports.viewAgreement=(req,res)=>
{
  const qry = `SELECT * FROM STARTUP s , USER u, AGREEMENT a WHERE u.id=a.CID and s.Sid= a.sId`
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  let decoded = jwt.verify(
    token,
    "dbmsminiproject@5thsem@cse@cmrit$bengalore&karnataka",
    function (err, decoded) {
      return decoded.id;
    }
  );
  const qry2 = `SELECT * FROM USER u WHERE u.id=${decoded}`;
  
  db.query(qry, (err, response) => {
    if (err) {
      console.log(err);
    }

    db.query(qry2, (err, response2) => {
      if (err) {
        console.log(err);
      }
     let e= response2[0].email
    
      res.status(200).render("viewAgreement", { response, e });
    });
  });

}