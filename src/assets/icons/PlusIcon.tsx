type Props = {
  size?: number;
  color?: string;
};
const PlusIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke={color || "#DFDFEC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18V6" stroke={color || "#DFDFEC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default PlusIcon;
