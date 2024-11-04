interface MessageProps {
  label: string;
  isActive: boolean;
}

export const Message = ({ label, isActive = false }: MessageProps) => {
  return <div>{`${label} [active: ${isActive}]`}</div>;
};
