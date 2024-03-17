import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './HomePage.css'

const HomePage = () => {

    const [data,setData] = useState([]);
    // const[loding,setLoding] = useState(true);
    const[inputs,setInputs] = useState("")
    const [array,setArray] = useState([])
    const [cards,setCards] = useState(20);

    useEffect(()=>{

        console.log(inputs);
        getData();

    },[cards])

    useEffect(()=>{
        console.log(inputs);
        const newArray=[];
            for(let i = 0;i<array.length;i++){
                const bodyPart = array[i].bodyPart
                const target = array[i].target
                const name = array[i].name
                if(bodyPart.includes(inputs.toLowerCase()) || target.includes(inputs.toLocaleLowerCase()) || name.includes(inputs.toLocaleLowerCase())){
                    newArray.push(array[i]);
                }
            }
            console.log(inputs);
            setData(newArray)
    },[inputs])

    function handelChange(e){
            setInputs(e.target.value);
    }

    

    async function getData(){

        try {
            const options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                params: {limit: cards},
                headers: {
                  'X-RapidAPI-Key': '69b8640138msh9a115b3ec13587dp1770e0jsn2fd1ec67a642',
                  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            console.log(response.data);
            setData(response.data);
            setArray(response.data);
        } catch (error) {
            console.error(error);
        }

    }

  return (
    <div>
        <div className="cont">
            <div className="hdng">
                <h1>Where Fitness Meets Fun and Results Are Achieved</h1>
                <p>Include an inspiring image or video that showcases your gym's energetic atmosphere, trainers, or members working out.</p>
            </div>
            <div className="srch_sec">
                <input type="text" onChange={handelChange} value={inputs}/>
            </div>
            
            <div className="images_sec">
                <div className="imgss">
                    {
                        data.map((obj)=>{
                            return(
                                <div className='inner'>
                                    <img src={obj.gifUrl} alt="" />
                                    <h2>{obj.name}</h2>
                                    <p>{obj.target}</p>
                                    <p>{obj.bodyPart}</p>
                                </div>
                                
                                
                            )
                        })
                    }
                </div>
               
                
            </div>
            <button onClick={()=>{
                setCards((prev)=>{ 
                    return prev+10
                })
            }}>Show More</button>
        </div>
    </div>
  )
}

export default HomePage


// 672444eaf8msh8b507bd5de45338p1fdda4jsn1ef9821237db