import React from 'react'
import Select from 'react-select'

const Dropdown = ({countries, setCountry}) => {

  const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'indigo' : 'black',
    padding: 20,
    "&:hover": {
      border: '1px solid rgb(133, 142, 209)',
    },
  }),
  control: () => ({
    minHeight: '56px',
    flexBasis: '15%',
    marginRight: '5px',
    height: '100%',
    display: 'flex',
    border: '1px solid rgb(226, 226, 226)',
    borderRadius: '5px',
    "&:hover": {
      border: '1px solid rgb(133, 142, 209)',
    },
    "&:focus-within": {
      border: '2px solid rgb(133, 142, 209)',
    },
  }),
  valueContainer: (provided) => ({
      ...provided,
      minWidth: '70px',
      padding: '0px 0px 0px 12px',
  }),
  indicatorSeparator: () => ({
    backgroundColor: 'white',
  }),
  menu: () => ({
    backgroundImage: 'linear-gradient(to right bottom, #d1e3f5, #e2f5fb 43%,#fef7e2 77%, #fff2e2 92%)',
    marginRight: '5px',
    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    
    return { ...provided, opacity, transition};
  }
}

  return (
    <Select 
    styles={customStyles} 
    defaultValue={{value:'nl',label:'NL'}} 
    onChange={(e) => setCountry(e.value)} 
    options={countries} 
    formatOptionLabel={country => (
      <div className="country-option">
        <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.label}.svg`} alt="country-flag" className="flag-icon"/>
        <span style={{fontWeight: 'bold'}}>{country.label}</span>
      </div>)}
    />
  )
}


export default Dropdown
