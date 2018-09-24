import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import CategoryCheckbox from './CategoryCheckbox';

function FoodCategoryCheckbox(props) {

  const { foodCategories, preferences, handleChange } = props;

  return (
    <React.Fragment>
      <FormGroup row>
        { foodCategories.map( category => {
          return (
            <CategoryCheckbox
              key={category.id}
              category={category}
              handleChange={handleChange}
              checked={preferences.includes(category.id.toString())}
            />
          )
        })}
      </FormGroup>
    </React.Fragment>
  )
}

export default FoodCategoryCheckbox;