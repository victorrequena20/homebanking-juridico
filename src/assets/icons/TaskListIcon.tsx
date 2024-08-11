type Props = {
  size?: number;
  color?: string;
};
const TaskListIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 19.5H21"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12.5H21"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 5.5H21" stroke={color || "#DFDFEC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3 5.5L4 6.5L7 3.5"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.5L4 13.5L7 10.5"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19.5L4 20.5L7 17.5"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TaskListIcon;
