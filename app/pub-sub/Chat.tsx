interface ChatProps {
  id: string;
  label: string;
  isActive: boolean;
}

export const Chat = ({ id, label, isActive = false }: ChatProps) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "12px" }}>
      {`id: ${id}; ${label} [active: ${isActive}]`}
    </div>
  );
};
