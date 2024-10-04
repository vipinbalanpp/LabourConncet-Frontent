interface PropType {
    style?: string;
    text?: string;
    onClick?: () => void;
  }
  
  const CustomButton = ({ style = '', text = '', onClick }: PropType) => {
    return (
      <button
        onClick={onClick}
        className={`${style}`}
      >
        {text}
      </button>
    );
  };
  
  export default CustomButton;
  
