interface HelloProps {
  name?: string;
}

const Hello: React.FC<HelloProps> = ({ name = "World" }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Hello;
