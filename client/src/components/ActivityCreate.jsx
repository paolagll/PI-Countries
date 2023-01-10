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
        })
    })

    useEffect(()=> {
        dispatch(getCountries())
    },[]);

    function validate(input) {
        // let hasErrors = false;
        // let errors = {};
      
        // if (input.name.trim() === "") {
        //   errors.name = "Activity name required";
        // //   hasErrors = true;
        // } else if (input.name.length < 3 || input.name.length > 15) {
        //   errors.name = "Activity name invalid";
        // //   hasErrors = true;
        // }

        // // if (input.countries.length === 0) {
        // //     errors.countriesName= 'Select a country IF';
        // //     hasErrors=true;
        // // }
      
        // errors.duration = input.duration <= 0 || input.duration >= 24 ? "Duration must be in 24 hs format" : "";
        // errors.season = input.season ? "" : "Select a season";
        // errors.countriesName = input.countries.length !== 0 ? '': 'Select a country';
        // errors.difficulty = input.difficulty ? "" : "Select a difficulty";

        // return errors;

       
        let errors = {}
    
        if (!input.name) {
            errors.name = 'Name is required'
        }
        else if (!input.duration) {
          errors.duration = 'Duration is required'
        }
        else if ( input.duration > 24 || input.duration < 1 ){
          errors.duration = 'Duration must be from 1 to 24 hours'
            }
        else if (!input.difficulty){
          errors.difficulty = 'Difficulty is required'
        }
        else if (input.difficulty > 5 || input.difficulty < 1){
                errors.difficulty = 'Difficulty must be from 1 to 5'
            }
            else if (!input.season) {
                errors.season = 'You must select a season'
            }
            else if (!input.countries) {
                errors.countries = 'You must select at least one country'
            }
            return errors;
        
    };
      
    function handleChange(e){
        setButtonEnabled(true);
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
        setButtonEnabled(true);
        if(e.target.value !== 'default'){
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
        }
        // if(input.countries.includes(e.target.value)) return alert("Country already select"); ver desp
       
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleSelect(e){
        setButtonEnabled(true);
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
        setButtonEnabled(true);
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
        <div className="cont_act">
            <div className="container-create">
                <Link to = '/home' className="back_"><button className="back">Back</button></Link>
                <h1 className="titulo">Create your activity!</h1>
                <div className="container_form">            
                <form className="form" onSubmit={e=>handleSubmit(e)}>
                    <div className="input_">
                        <label>Activity:</label>
                        <input type="text"
                        value={input.name}
                        name='name'
                        className="cajainput"
                        onChange={handleChange}
                        />
                        {errors.name&&(
                            <p className="warning">{errors.name}</p>
                        )}
                    </div>
                    <div className="select_form">
                        {/* <label>Diffilculty:</label> */}
                        <select defaultValue={'default'} name='difficulty' onChange={e=> handleSelect(e)}>
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
                    <div className="input_">
                        <label>Duration:</label>
                        <input type="number"
                        name='duration'
                        className="cajainpuths"
                        value={input.duration}
                        onChange={handleChange}
                        />
                        <p>Hs </p>
                        {errors.duration &&(
                            <p className="warning">{errors.duration}</p>
                        )}
                    </div>
                    <div className="select_form">
                        {/* <label>Season:</label> */}
                        <select defaultValue={'default'} name="season" onChange={e=>handleSelect(e)}>
                            <option value="default" disabled>Season</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumm</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>
                    <div>{errors.season&&(
                        <p className="warning" >{errors.season}</p>
                    )}
                    </div>
                    <div className="select_form">
                        <select defaultValue={'default'} name="country name" onChange={e=>handleCountrySelect(e)}>
                            <option value="default" disabled>Select country</option>
                            {countryList?.map(c=>(
                                <option value={c.name} key={c.name}>{c.name}</option>
                            ))}
                        </select>
                            {errors.countries&&(
                            <p className="warning">{errors.countries}</p>
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
                    <button type="submit" className='boton_crear' disabled={Object.keys(errors).length !== 0 || !buttonEnabled}>Create</button>
                </form>
                </div>  
                </div>
            
        </div>
    )
      
}
