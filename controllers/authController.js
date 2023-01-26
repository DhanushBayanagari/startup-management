const sql = require("mysql");
const express = require("express");
const db = sql.createConnection({
  host: "localhost",
  user: "madakari",
  password: "Oo(6D.Ei]@BllnO9",
  database: "dbmsmini",
});
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });

const signToken = (id) => {
  return jwt.sign(
    { id: id },
    "dbmsminiproject@5thsem@cse@cmrit$bengalore&karnataka",
    { expiresIn: "30d" }
  );
};

const createSendToken = (user, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const qry = `INSERT INTO USER(name ,email, phone, password  ) values("${req.body.name}","${req.body.email}",${req.body.phone},"${req.body.password}")`;
    const qry2 = `SELECT * FROM USER WHERE email="${req.body.email}"`;
    db.query(qry, (err, response) => {
      if (err) {
        throw err;
      }
    });

    db.query(qry2, (err, response) => {
      if (err) {
        throw err;
      }

      createSendToken(response[0], res);
    });
  } catch (err) {
    console.log("error at signup");
    console.log(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const qry2 = `SELECT * FROM USER WHERE email="${req.body.email}" and '${req.body.password}=USER.password'`;

    db.query(qry2, (err, response) => {
      if (err) {
        throw err;
      }

      createSendToken(response[0], res);
    });
  } catch (err) {
    console.log("error at signup");
    console.log(err);
  }
};
exports.ristrictTo = (...roles) => {
  try {
    return async (req, res, next) => {
      let token;

      if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      console.log(token);

      if (token) {
        let decoded = jwt.verify(
          token,
          "dbmsminiproject@5thsem@cse@cmrit$bengalore&karnataka",
          function (err, decoded) {
            return decoded.id;
          }
        );
        const qry = `SELECT * FROM USER WHERE id=${decoded}`;

        db.query(qry, (err, response) => {
          if (err) {
            throw err;
          }

          if (!roles.includes(response[0].roles)) {
            res
              .status(404)
              .json({ status: "fail", message: "not authenticated" });
          }
        });
      } else {
        res.status(404).json({ status: "fail", message: "login 1st" });
      }

      next();
    };
  } catch (err) {
    console.log(err);
  }
};
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};