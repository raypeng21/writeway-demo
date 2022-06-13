import Idea from '../Idea/Idea';
import Share from "../Share/Share";
import "./feed.scss";
import { useState, useEffect, useContext} from "react";

import axios from '../../axios';
import { Context } from '../../context/Context';

export default function Feed() {   

    const[ideas, setIdeas] = useState([]);
    const {user} = useContext(Context);

    useEffect(() => {
        const fetchIdeas = async () =>{
            const res = await axios.get("/ideas/timeline/" + user._id) 
            setIdeas(res.data.sort((p1,p2) =>{
              return new Date(p2.createdAt)  -new Date(p1.createdAt)  //get all ideas
                  //compare the create time and sort
            }));
        }
        
        fetchIdeas();

    }, [user?._id ])
    
  return (
    <div className="feed">
      <div className="feedWrapper">
        {ideas.map((idea) => (     //map all ideas data above, pass to idea unit component
        <Idea key={idea._id} idea={idea} />
        ))}
      </div>
        <Share />


    </div>
  );
}