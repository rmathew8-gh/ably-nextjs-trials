interface MessageProps {
  id: string;
  label: string;
  isActive: boolean;
}

export const Message = ({ id, label, isActive = false }: MessageProps) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '12px' }}>
      {`id: ${id}; ${label} [active: ${isActive}]`}
    </div>
  );
};
