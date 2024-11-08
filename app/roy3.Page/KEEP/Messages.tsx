import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetMessagesData {
    yourData {
      name
    }
  }
`;

interface MessagesProps {
  name?: string;
}

const Messages: React.FC<MessagesProps> = ({ name: defaultName = "World" }) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = data?.yourData?.name || defaultName;
  return <h1>Messages, {name}!</h1>;
};

export default Messages;
