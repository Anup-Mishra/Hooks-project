import React, { useEffect, useState, useRef } from 'react';
import useHttp from '../../hooks/http';
import Card from '../UI/Card';
import './Search.css';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter,setenteredFilter] = useState('');
  const inputRef = useRef();
  const {isLoading,data,error,sendRequest,clear} = useHttp();
  
  useEffect(()=> {
    const timer = setTimeout(()=>{
      if(enteredFilter===inputRef.current.value){
        const query = enteredFilter.length===0?'':`?orderBy="title"&equalTo="${enteredFilter}"`
        sendRequest('urltotherequest.json'+query,'GET',);
        }
    },500);
    return ()=> {
      clearTimeout(timer);
    }
},[enteredFilter,inputRef,sendRequest])

 useEffect(()=> {
   if(data && !isLoading && !error){
    const loadedIngredients = [];
    for(const key in data){
      loadedIngredients.push({
        id: key,
        title: data[key].title,
        value: data[key].value
      });
    }
    onLoadIngredients(loadedIngredients);
   }
 },[data,isLoading,error,onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={enteredFilter} onChange={event => setenteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
