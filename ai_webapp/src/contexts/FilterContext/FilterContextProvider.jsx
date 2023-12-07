import { createContext, useContext, useEffect,useReducer } from "react";
import { useProductContext } from "../../components/useAuth/useAuth";
// FilterContextProvider.js
import filterReducer from '../../reducer/FilterReducer';

// ... rest of the code ...


const FilterContext=createContext()

const initialState={
    filter_products:[],
    all_products:[],
    grid_view:true,
}

export const FilterContextProvider=({children})=>{
    const {products}=useProductContext()

    const [state,dispatch]=useReducer(filterReducer,initialState)

    const setGridView=(view)=>{
        return dispatch({type:"SET_GRIDVIEW",payload:view})
    }

    useEffect(()=>{
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products})
    },[products])

    return <FilterContext.Provider value={{...state,setGridView}}>{children}</FilterContext.Provider>
}

export  const useFilterContext=()=>{
    return useContext(FilterContext)
}