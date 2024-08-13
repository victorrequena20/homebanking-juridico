type Props = {
  size?: number;
  color?: string;
};
const EyeIcon = ({ size, color }: Props) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 8C21 8 16.5228 15 11 15C5.47715 15 1 8 1 8C1 8 5.47715 1 11 1C16.5228 1 21 8 21 8Z"
        stroke={color || "black"}
        strokeLinecap="round"
      />
      <path
        d="M15 8C15 10.2091 13.2091 12 11 12C8.79086 12 7 10.2091 7 8C7 5.79086 8.79086 4 11 4C13.2091 4 15 5.79086 15 8Z"
        stroke={color || "black"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EyeIcon;
