import { FaRegStar, FaStar,FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Stars = ({stars,reviews}) => {
    const ratingstar=Array.from({length:5},(ele,index)=>{
        let number=index+0.5

        return <span key={index}>
            {
                stars>index+1 ? (<FaStar className="icon"/>) : stars>number ? (<FaStarHalfAlt className="icon"/>) : <FaRegStar className="icon"/>
            }
        </span>
    })
  return (
    <div>
      <div className="icon-style">
        {ratingstar}
        <p>{reviews}</p>
      </div>
    </div>
  )
}

export default Stars
