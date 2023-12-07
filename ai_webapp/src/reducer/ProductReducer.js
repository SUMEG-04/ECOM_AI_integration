
const ProductReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
          return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
          return { ...state, isAuthenticated: false, user: null };
        case "SET_LOADING":
            return{
                ...state,
                isLoading:true,
            }
        case "SET_SINGLE_LOADING":
            return{
                    ...state,
                    isSingleLoading:true,
                }
        case "SET_SINGLE_PRODUCT":
            return{
                ...state,
                isSingleLoading:false,
                singleProduct:action.payload,

            }
        case "SET_SINGLE_ERROR":
                return{
                    ...state,
                    isSingleLoading:false,
                    isError:true,
                }
        case "SET_API_DATA":
            const featuredDate=action.payload.filter((currElem)=>{
                return currElem.featured === true 
            })

            return{
                ...state,
                isLoading:false,
                products:action.payload,
                featuredProducts:featuredDate,
            }

        case "API_ERROR":
                return{
                    ...state,
                    isLoading:false,
                    isError:true,
                }
        
        default:
            return state;
    }

}

export default ProductReducer
