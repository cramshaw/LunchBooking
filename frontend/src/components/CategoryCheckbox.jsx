import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CategoryCheckbox(props) {

  const { category } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.handleChange}
          value={category.id.toString()}
        />
      }
      label={category.name}
    />
  )
}

export default CategoryCheckbox;