import React,{ useCallback, useEffect, useMemo, useReducer } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
const ingredientReducer = (currentIngredients,action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case "ADD":
      return [...currentIngredients,action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing=>ing.id!==action.id);
    default:
      throw new Error('Should not get there');
  }
}

const Ingredients = () => {
  const [ingredients,dispatch] = useReducer(ingredientReducer,[]);
  const {isLoading,error,data,sendRequest,extra,identifier,clear} = useHttp();

  useEffect(()=>{
    if(!isLoading && identifier==='REMOVE_INGREDIENT'){
    dispatch({type: 'DELETE',id: extra})
    }else if(!isLoading && data && identifier==='ADD_INGREDIENT'){
      dispatch({type: 'ADD',ingredient: {id: data.name, ...extra}})
    }
  },[data,extra,identifier,isLoading])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET',ingredients: filteredIngredients});
  },[]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('urltotherequest','POST',JSON.stringify(ingredient),
    ingredient,'ADD_INGREDIENT');
  },[sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`url/${ingredientId}`,'DELETE',null,ingredientId,'REMOVE_INGREDIENT')
  },[sendRequest])

  const ingredientList = useMemo(()=> {
    return (
      <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
    );
  },[ingredients,removeIngredientHandler]);

  return (
    <div className="App">
      {error&&<ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onIngredientAdded={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
