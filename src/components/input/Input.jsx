import './Input.css'

const Input = ({type, placeholder, name, onChange, value}) => {
    return (
        <input className='Input' type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}/>
    )
}

export default Input