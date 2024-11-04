interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

export const Button = ({ label, primary = false, onClick }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded";
  const colorStyles = primary 
    ? "bg-blue-500 text-white" 
    : "bg-gray-200 text-black";

  return (
    <button 
      className={`${baseStyles} ${colorStyles}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}; 