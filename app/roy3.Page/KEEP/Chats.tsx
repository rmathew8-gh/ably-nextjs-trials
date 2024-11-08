import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetChatsData {
    yourData {
      name
    }
  }
`;

interface ChatsProps {
  name?: string;
}

const Chats: React.FC<ChatsProps> = ({ name: defaultName = "World" }) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = data?.yourData?.name || defaultName;
  return <h1>Chats, {name}!</h1>;
};

export default Chats;
