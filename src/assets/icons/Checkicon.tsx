type Props = {
  size?: number;
  color?: string;
};
const CheckIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 16} height={size || 12} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.666 1L5.49937 10.1667L1.3327 6"
        stroke={color || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
