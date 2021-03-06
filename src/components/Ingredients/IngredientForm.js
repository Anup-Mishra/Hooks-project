import React,{ useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputState,setInputState] = useState({title: '', value: ''});

  const submitHandler = event => {
    event.preventDefault();
    props.onIngredientAdded({title: inputState.title,value: inputState.value});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState.title} onChange={event=> 
              {const newTitle = event.target.value;setInputState(prevInputState=>({title: newTitle, value: prevInputState.value}))}}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState.value} onChange={event=> {const newValue = event.target.value;setInputState(prevInputState=>({title: prevInputState.title,value: newValue}))}}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading?<LoadingIndicator />:null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
