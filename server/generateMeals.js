const checkRequirements = (preferences, choices) => {
  const validated = choices.reduce( (acc, choice) => {

    choice.food_categories.forEach( (category) => {
      if (acc.indexOf(choice)) {
        acc.splice(acc.indexOf(choice), 1)
      }
    })

    return acc;
  }, preferences)
  return validated.length === 0;
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

      const filteredMealData = mealData.filter( (meal) => {
        return preferences.reduce( (acc, val) => {
          if (meal.food_categories.includes(val.food_category_id.toString())) {
            return true
          }
          return acc
        }, false)
      })

      // Recursively iterate over list, incrementing to try all combos. Once
      // a combo returns the below func as valid, go ahead and set it
      // in the table and return to the user
      const valid = checkRequirements(preferences, filteredMealData)

      res.json({"status": 200, "error": null, "response": filteredMealData});

    })

  })

}

export default generateMeals;