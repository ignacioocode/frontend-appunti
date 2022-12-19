import './Button.css'

const Button = ({text, type, onClick, className}) => {
     return (
        <button className={`Button ${className}` }type={type} onClick={onClick} >{text}</button>
     )
}

export default Button