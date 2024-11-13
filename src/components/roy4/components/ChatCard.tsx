export interface Chat {
  id: string;
  text: string;
  username: string;
}

interface ChatCardProps {
  chat: Chat;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({ chat, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "1rem",
        margin: "0.5rem 0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: isSelected ? "#f0f0f0" : "white",
        border: `1px solid ${isSelected ? "#007bff" : "#e1e1e1"}`,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div
        style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}
      >
        {chat.username}
      </div>
      <div style={{ marginBottom: "0.5rem" }}>{chat.text}</div>
      <div style={{ fontSize: "0.7rem", color: "#999" }}>ID: {chat.id}</div>
    </div>
  );
};
