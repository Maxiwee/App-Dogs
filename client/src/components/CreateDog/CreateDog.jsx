import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, getDogs } from '../../redux/actions';
import SelectCard from '../SelectCard/SelectCard';
import styles from './CreateDog.module.css';

const CreateDog = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.allTemperaments);
  const allDogs = useSelector(state => state.allDogs);
  const [input, setInput] = useState({
    image: '',
    breed: '',
    temperaments: [],
    height: '',
    weight: '',
    years: '',
  });
  const [errors, setErrors] = useState({});
  const [maxSelect, setMaxSelect] = useState(false);
  const [sumbit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, []);

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const validationForm = input => {
    let errors = {};

    //validations input image

    if (!input.image) setErrors({});
    else if (
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/.test(
        input.image
      )
    )
      errors.image = 'Not valid format';

    //validations input breed

    let breed = allDogs?.find(
      breed =>
        breed.breed.toLowerCase().replace(/\s+/g, '') ===
        input.breed.toLowerCase().replace(/\s+/g, '')
    );

    if (!input.breed) errors.breed = 'This field is required';
    else if (!/^.{0,25}$/.test(input.breed))
      errors.breed = 'This field cannot contain more than 30 characteres';
    else if (breed) errors.breed = 'The breed already exists';

    //validations input hight
    if (!input.height) errors.height = 'This field is required';
    else if (!/^[0-9]{1,2} +(- [0-9]{1,2})$/.test(input.height))
      errors.height = 'This field does not meet the required format, Ej: 3 - 6';

    //validations input weight
    if (!input.weight) errors.weight = 'This field is required';
    else if (!/^[0-9]{1,2} +(- [0-9]{1,2})$/.test(input.weight))
      errors.weight =
        'This field does not meet the required format, ej: 23 - 29';

    //validations input years
    if (!input.years) errors.years = 'This field is required';
    else if (!/^([0-9])*$/.test(input.years))
      errors.years = 'This field can have only numbers';
    else if (!/^([0-9]){1,3}$/.test(input.years))
      errors.years = 'This field cannot contain more than 3 numbers';

    return errors;
  };

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validationForm({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const resp = await axios.post('/dogs', input);
    } catch (error) {
      console.log(error.message);
    }

    setInput({
      image: '',
      breed: '',
      temperaments: [],
      height: '',
      weight: '',
      years: '',
    });

    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);
  };

  const handleSelection = value => {
    if (value === 'Select') return;
    if (input.temperaments.length > 5) {
      setMaxSelect(true);
      setTimeout(() => {
        setMaxSelect(false);
      }, 2000);
      return;
    }
    setInput({
      ...input,
      temperaments: [...new Set([...input.temperaments, value])],
    });
  };

  const deleteSelection = e => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(s => s !== e.target.value),
    });
    setMaxSelect(false);
  };

  const disable = () => {
    if (!input.breed || !input.height || !input.weight || !input.years)
      return true;

    if (!isObjEmpty(errors)) return true;

    return false;
  };

  return (
    <div className={styles.background}>
      <div className={styles.bodyform}>
        <h1>Create New Breed</h1>
        <form
          onSubmit={e => handleSubmit(e)}
          autoComplete={'off'}
          className={styles.form}
        >
          <div className={styles.required}>
            Required fields are marked with *
          </div>
          <div className={styles.bodyinputs}>
            <div className={styles.columnform}>
              <label>Image</label>
              <input
                type='text'
                name='image'
                value={input.image}
                onChange={e => handleChange(e)}
                className={styles.inputs}
                placeholder='.png'
              ></input>
              <div className={styles.errors}>
                {errors.image ? <span>{errors.image}</span> : null}
              </div>
              <label>Breed*</label>
              <input
                type='text'
                name='breed'
                value={input.breed}
                onChange={e => handleChange(e)}
                className={errors.breed ? styles.inputIncorrect : styles.inputs}
                placeholder='Name breed...'
              ></input>
              <div className={styles.errors}>
                {errors.breed ? <span>{errors.breed}</span> : null}
              </div>
              <label>Height*</label>
              <input
                type='text'
                name='height'
                value={input.height}
                onChange={e => handleChange(e)}
                className={
                  errors.height ? styles.inputIncorrect : styles.inputs
                }
                placeholder='00 - 00'
              ></input>
              <div className={styles.errors}>
                {errors.height ? <span>{errors.height}</span> : null}
              </div>

              <label>Weight*</label>
              <input
                type='text'
                name='weight'
                value={input.weight}
                onChange={e => handleChange(e)}
                className={
                  errors.weight ? styles.inputIncorrect : styles.inputs
                }
                placeholder='00 - 00'
              ></input>
              <div className={styles.errors}>
                {errors.weight ? <span>{errors.weight}</span> : null}
              </div>

              <label>Years of life*</label>
              <input
                type='text'
                name='years'
                value={input.years}
                onChange={e => handleChange(e)}
                className={errors.years ? styles.inputIncorrect : styles.inputs}
                placeholder='00'
              ></input>
              <div className={styles.errors}>
                {errors.years ? <span>{errors.years}</span> : null}
              </div>
            </div>
            <div className={`${styles.columnform} ${styles.columformsize}`}>
              <label>Temperaments</label>
              <select
                name='Temperament Selection'
                onChange={e => handleSelection(e.target.value)}
                className={styles.select}
              >
                <option>Select</option>
                {temperaments.map(t => (
                  <option key={t.id}>{t.name}</option>
                ))}
              </select>
              <div className={styles.selection}>
                {input.temperaments?.map(s => (
                  <SelectCard
                    key={s}
                    select={s}
                    deleteSelection={deleteSelection}
                  />
                ))}
                {maxSelect ? (
                  <label className={styles.maxselect}>
                    Max select temperaments
                  </label>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.wrap}>
            <button
              type='sumbit'
              className={!disable() ? styles.button : styles.offButton}
              disabled={disable()}
            >
              Submit
            </button>
            {sumbit ? (
              <label className={styles.submit}>
                Breed created successfully
              </label>
            ) : (
              <label className={styles.submit}></label>
            )}
          </div>
          <Link to={'/home'} className={styles.buttonBack}>
            {'<'}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
