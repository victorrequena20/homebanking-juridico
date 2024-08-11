type Props = {
  size?: number;
  color?: string;
};
const HomeIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 32} height={size || 32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 24V20" stroke={color || "#DFDFEC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M13.4267 3.75996L4.18667 11.16C3.14667 11.9866 2.48 13.7333 2.70667 15.04L4.48 25.6533C4.8 27.5466 6.61333 29.08 8.53333 29.08H23.4667C25.3733 29.08 27.2 27.5333 27.52 25.6533L29.2933 15.04C29.5067 13.7333 28.84 11.9866 27.8133 11.16L18.5733 3.7733C17.1467 2.62663 14.84 2.62663 13.4267 3.75996Z"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
