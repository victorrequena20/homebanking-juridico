type Props = {
  size?: number;
  color?: string;
};
const ArrowCircleReceiveIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L13.8 10.2"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.17V11H17.83"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowCircleReceiveIcon;
