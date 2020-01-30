const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const fetch = require("node-fetch");
require("dotenv").config();

const getMovieById = (req, res) => {
  let sql = "SELECT * FROM title_basics WHERE tconst = $1";
  pool.query(sql, [req.params.tconst], (err, dbRes) => {
    if (err) return handleSQLError(res, err);
    return res.json(dbRes.rows[0]);
  });
};

const getMovieDetailsById = (req, res) => {
  let sql =
    "SELECT * FROM title_basics INNER JOIN title_principals USING (tconst) INNER JOIN name_basics USING (nconst) WHERE tconst = $1 ORDER BY ordering asc";
  pool.query(sql, [req.params.tconst], (err, dbRes) => {
    if (err) return handleSQLError(res, err);
    return res.json(dbRes.rows);
  });
};

const findMovieMatch = (req, res) => {
  let sql =
    "SELECT * FROM title_principals INNER JOIN title_basics USING (tconst) WHERE (nconst) LIKE $1 AND (category) LIKE $2 ORDER BY random() LIMIT 1";
  pool.query(sql, [req.params.nconst, req.params.category], (err, dbRes) => {
    if (err) return handleSQLError(res, err);
    // let dbResJSON = res.json(dbRes.rows);
    // console.log(dbResJSON);
    // fetch(
    //  `https://omdbapi.com/apikey=${process.env.OMDB_API_KEY}?i=${dbResJSON[0].tconst}`
    //)
    //  .then(data => {
    //    return data.json();
    //  })
    // .then(res => console.log(res));
    // dbResJSON.poster = omdbRes["Poster"];
    // return dbResJSON;
    return res.json(dbRes.rows);
  });
};

module.exports = {
  getMovieById,
  getMovieDetailsById,
  findMovieMatch
};
