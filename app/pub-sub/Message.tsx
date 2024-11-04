interface MessageProps {
  id: string;
  label: string;
  isActive: boolean;
}

export const Message = ({ id, label, isActive = false }: MessageProps) => {
  return <div>{`id: ${id}; ${label} [active: ${isActive}]`}</div>;
};
