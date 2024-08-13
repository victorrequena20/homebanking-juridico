type Props = {
  size?: number;
  color?: string;
};
const ArrowUpIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.9201 15.05L13.4001 8.53001C12.6301 7.76001 11.3701 7.76001 10.6001 8.53001L4.08008 15.05"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpIcon;
