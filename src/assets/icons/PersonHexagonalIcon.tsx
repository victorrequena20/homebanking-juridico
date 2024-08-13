type Props = {
  size?: number;
  color?: string;
};
const PersonHexagonalIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48 18.15C3.51 17.59 2.91 16.55 2.91 15.42V8.58003C2.91 7.46003 3.51 6.41999 4.48 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C13.2868 11 14.33 9.95681 14.33 8.66998C14.33 7.38316 13.2868 6.34003 12 6.34003C10.7132 6.34003 9.67 7.38316 9.67 8.66998C9.67 9.95681 10.7132 11 12 11Z"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16.66C16 14.86 14.21 13.4 12 13.4C9.79 13.4 8 14.86 8 16.66"
        stroke={color || "#DFDFEC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PersonHexagonalIcon;
