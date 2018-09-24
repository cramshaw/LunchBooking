import React from 'react';

import Button from '@material-ui/core/Button';

function GenerateMealsButton(props) {

  return (
    <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={props.generateMeals}
    >
        Suggest Meal Options
    </Button>
  )
}

export default GenerateMealsButton;