const checkRequirements = (preferences, choices) => {

  const preferenceIds = preferences.reduce( (acc, val) => {
    acc.push(val.food_category_id.toString())
    return acc
  }, [])
  const validated = choices.reduce( (acc, choice) => {

    choice.food_categories.forEach( (category) => {
      if (acc.indexOf(category) > -1 ) {
        acc.splice(acc.indexOf(category), 1)
      }
    })
    return acc;
  }, preferenceIds)
  return validated.length === 0;
}

const filterMealData = (filteredMealData, preferences) => {
  for (var i=0; i < filteredMealData.length - 3; i++) {
    for (var j=1; j < filteredMealData.length - 2; j++) {
      for (var k=2; k < filteredMealData.length - 1; k++) {
        if ( checkRequirements(preferences, [filteredMealData[i], filteredMealData[j], filteredMealData[k]]) ) {
          return [filteredMealData[i], filteredMealData[j], filteredMealData[k]];
        }
      }
    }
  }
  return [];
}


const generateMeals = (res) => {

  let meals, preferences;

  res.locals.connection.query(`
  SELECT id, name, GROUP_CONCAT(meal_categories.food_category_id) as food_categories
  FROM meals
  LEFT JOIN meal_categories ON meals.id=meal_categories.meal_id
  GROUP BY meals.id
  `, (error, results, fields) => {

    if (error) throw error;

    meals = results;

    res.locals.connection.query(`
    SELECT DISTINCT(food_category_id) from user_food_preferences
    `, (error, results, fields) => {

      if (error) throw error;

      preferences = results;

      const mealData = meals.map( (meal) => {
        return {
          ...meal,
          food_categories: meal.food_categories.split(',')
        }
      })

      const [filteredMealData, otherMealData] = mealData.reduce( ([relevant, others], meal) => {

        return preferences.reduce( (acc, val) => {
          if (meal.food_categories.includes(val.food_category_id.toString())) {
            return true
          }
          return acc
        }, false) ? [[...relevant, meal], others] : [relevant, [...others, meal]];

      }, [[],[]])


      // If there aren't 3 meals with all the requirements, let's add a couple of random ones.
      while (filteredMealData.length < 3) {
        filteredMealData.push(otherMealData[filteredMealData.length])
      }

      const chosenMeals = filterMealData(filteredMealData, preferences);

      // chosenMeals.map(() =>{
      //   res.locals.connection.query(`
      //     INSERT into chef_selected_meals (meal_id) VALUES (${})
      //     `, (error, results, fields) => {

      //     if (error) throw error;
      //   })
      // })

      res.json({"status": 200, "error": null, "response": chosenMeals});

    })

  })

}

export default generateMeals;