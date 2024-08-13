type Props = {
  size?: number;
  color?: string;
};
const FilterIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.40002 2.10001H18.6C19.7 2.10001 20.6 3.00001 20.6 4.10001V6.30001C20.6 7.10001 20.1 8.10001 19.6 8.60001L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.50001C3.80002 8.00001 3.40002 7.10001 3.40002 6.50001V4.20001C3.40002 3.00001 4.30002 2.10001 5.40002 2.10001Z"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.93 2.10001L6 10"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
