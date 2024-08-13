type Props = {
  size?: number;
  color?: string;
};
const EyeCloseIcon = ({ size, color }: Props) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.1284 10.9464C19.7566 9.30323 20.75 7.75 20.75 7.75C20.75 7.75 16.2728 0.75 10.75 0.75C9.92433 0.75 9.12203 0.906455 8.35456 1.17258M3.81066 0.75L18.3063 15.2457M0.75 7.75C0.75 7.75 2.68788 4.72014 5.58647 2.64713L15.8426 12.9033C14.351 13.9562 12.6098 14.75 10.75 14.75C5.22715 14.75 0.75 7.75 0.75 7.75ZM10.75 11.75C8.54086 11.75 6.75 9.95909 6.75 7.74995C6.75 6.7355 7.12764 5.80926 7.75 5.10413L13.6104 10.5461C12.8841 11.2889 11.8709 11.75 10.75 11.75Z"
        stroke={color || "black"}
        strokeLinecap="round"
      />
      ;
    </svg>
  );
};

export default EyeCloseIcon;
