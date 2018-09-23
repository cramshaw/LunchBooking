import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bodyParser from 'body-parser';

import generateMeals from './generateMeals';

const app = express()
const port = 4000

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use( function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'db',
    user     : 'docker',
    password : 'docker',
    database : 'docker'
  });
  res.locals.connection.connect();
    next();
});

// app.get('/api', (req, res) => {
//   res.locals.connection.query(`Show tables`, function (error, results, fields) {
//     if (error) throw error;
//     res.json({"status": 200, "error": null, "response": results});
//   });
// })

app.get('/api/diners', (req, res) => {
  res.locals.connection.query(`
  SELECT id, type, fullname, GROUP_CONCAT(user_food_preferences.food_category_id) AS food_preferences
  FROM users
  LEFT JOIN user_food_preferences ON users.id=user_food_preferences.user_id
  WHERE type="USER"
  GROUP BY users.id
  `, function (error, results, fields) {
      if (error) throw error;
      res.json({"status": 200, "error": null, "response": results});
  });
})

app.get('/api/food_categories', (req, res) => {
  res.locals.connection.query('SELECT id, name from food_categories', function (error, results, fields) {
      if (error) throw error;
      res.json({"status": 200, "error": null, "response": results});
  });
})

app.get('/api/chef_meals', (req, res) => {
  res.locals.connection.query('SELECT id, name from chef_selected_meals', function (error, results, fields) {
      if (error) throw error;
      res.json({"status": 200, "error": null, "response": results});
  });
})

app.get('/api/generate_meals', (req, res) => {

  generateMeals(res);

})

app.get('/api/diner_preferences/:userId', (req, res) => {
  res.locals.connection.query(`
    SELECT food_category_id
    FROM user_food_preferences
    WHERE user_id=${req.params.userId}
    `, function (error, results, fields) {
      if (error) throw error;
      const responseData = results.reduce(
        (arr, val) => [...arr, val.food_category_id], [])
      res.json({"status": 200, "error": null, "response": responseData});
  });
})

app.post('/api/diner_preferences/:userId', (req, res) => {

  const userId = req.params.userId;
  const foodCategory = req.body.food_category

  res.locals.connection.query(`INSERT INTO user_food_preferences VALUES(${userId}, ${foodCategory})`, function (error, results, fields) {
      if (error) throw error;
      res.json({"status": 200, "error": null, "response": results});
  });

})

app.delete('/api/diner_preferences/:userId/preference/:food_category', (req, res) => {

  res.locals.connection.query(`DELETE FROM user_food_preferences WHERE user_id=${req.params.userId} AND food_category_id=${req.params.food_category}`, function (error, results, fields) {
      if (error) throw error;
      res.json({"status": 200, "error": null, "response": results});
  });

})

// app.get('/api/:table', (req, res) => {
//   res.locals.connection.query(`SELECT * from ${req.params.table}`, function (error, results, fields) {
//       if (error) throw error;
//       res.json({"status": 200, "error": null, "response": results});
//   });
// })

app.listen(port, () => console.log(`Listening on port ${port}!`))