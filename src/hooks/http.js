import {useReducer,useCallback} from  'react';

const initialState = {loading: false,
    error: null,data: null,extra: null,identifier: null};

const httpReducer = (curHttpState,action) => {
    switch(action.type){
      case 'SEND':
        return {loading: true,error: null,data: null,extra: null,identifier: action.identifier};
      case 'RESPONSE':
        return {...curHttpState,loading: false,data: action.data,extra: action.extra};
      case 'ERROR':
        return {loading: false,error: action.error,data: null};
      case 'CLEAR':
          return initialState
      default:
        throw new Error('should not reach here');
    }
  }

const useHttp = () => {
  const [httpState,dispatchHttp] = useReducer(httpReducer,initialState);
  const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}),[]);
    const sendRequest = useCallback((url,method,body,extra,identifier) => {
        dispatchHttp({type: 'SEND',identifier: identifier});
        fetch(url,{
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(reponse=> {
              reponse.json();
          }).then(responseData=>{
          dispatchHttp({type: 'RESPONSE',data: responseData, extra: extra});
          }).catch(error=>{
          dispatchHttp({type: 'ERROR',error: error.message});
          });
    },[])
    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        extra: httpState.extra,
        identifier: httpState.identifier,
        clear: clear
    };
}    

export default useHttp;