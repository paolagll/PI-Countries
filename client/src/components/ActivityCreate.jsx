import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postActivities, getCountries} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import '../styles/activityCreate.css'

export default function ActivityCreate(){

    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:'',
        countries:[],
    });

    let countryList = countries.map( c => {
        return ({
            name: c.name,
            img: c.img,
        })
    })

    useEffect(()=> {
        dispatch(getCountries())
    },[]);

    function validate(input) {
        let hasErrors = false;
        let errors = {};
      
        if (input.name.trim() === "") {
          errors.name = "Activity name required";
          hasErrors = true;
        } else if (input.name.length < 3 || input.name.length > 15) {
          errors.name = "Activity name invalid";
          hasErrors = true;
        }
      
        errors.duration = input.duration <= 0 || input.duration >= 24 ? "Duration must be in 24 hs format" : "";
        errors.season = input.season ? "" : "Select a season";
        errors.name = input.name ? "" : "Select a country";
        errors.difficulty = input.difficulty ? "" : "Select a difficulty";

        setButtonEnabled(!hasErrors);
        return errors;
    };
      
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleCountrySelect(e){
        if(input.countries.includes(e.target.value)) return alert("Country already select");
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    const deleteCountry = (e) => {
        setInput({
          ...input,
          countries: input.countries.filter(country => country !== e.target.value)
        })
       
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivities(input))
        alert("Activity created!")
        console.log('pepito',input)
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:'',
            countries:[]
        })
        history.push('/home')
    };

    return (
        <div>
            <div className="container-create">
                <Link to = '/home'><button className="back">Back</button></Link>
                <h1 className="titulo">Create your activity!</h1>
                <form className="form" onSubmit={e=>handleSubmit(e)}>
                    <div>
                        <label>Activity:</label>
                        <input type="text"
                        value={input.name}
                        name= "name"
                        onChange={handleChange}
                        />
                        {errors.name&&(
                            <p className="warning">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Diffilculty:</label>
                        <select defaultValue={'default'} name="difficulty" onChange={e=> handleSelect(e)}>
                            <option value="default" disabled>Diffilculty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        {errors.difficulty&&(
                            <p className="warning">{errors.difficulty}</p>
                        )}
                    </div>
                    <div>
                        <label>Duration:</label>
                        <input type="number"
                        name="duration"
                        value={input.duration}
                        onChange={handleChange}
                        />
                        {errors.duration &&(
                            <p className="warning">{errors.duration}</p>
                        )}
                    </div>
                    <div>
                        <label>Season:</label>
                        <select defaultValue={'default'} name="season" onChange={e=>handleSelect(e)}>
                            <option value="default" disabled>Season</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumm</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>
                    <div>{errors.season&&(
                        <p className="warning">{errors.season}</p>
                    )}
                    </div>
                    <div>
                        <select defaultValue={'default'} name="NombrePais" onChange={e=>handleCountrySelect(e)}>
                            <option value="default" disabled>Select country</option>
                            {countries.map(c=>(
                                <option value={c.name}>{c.name}</option>
                            ))}
                        </select>
                            {errors.countriesName&&(
                            <p className="warning">{errors.countriesName}</p>
                        )}
                    </div>
                    <div className="displayCountries">
                    {input.countries.map((country) => {
                     return (
                        <div className="countryDiv" key={country}>
                        <p className="countryName">{country}</p>
                        <button className="closeButton" onClick={e => { deleteCountry(e) }} value={country}>X</button>
                    </div>
                  )
                })}
              </div>
                    <button className="boton" type="submit" disabled={!buttonEnabled}>Crear</button>
                </form>
            </div>
        </div>
    )
      
}