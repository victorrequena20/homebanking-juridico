type Props = {
  size?: number;
  color?: string;
};
const ExitIcon = ({ size, color }: Props) => {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2V18H12V16.5H5.5V3.5H12V2H4ZM13.5835 6.84987L15.8387 9.10508H7.7499L7.7499 10.6051H15.8387L13.5835 12.8603L14.6442 13.9209L18.7101 9.85508L14.6442 5.78921L13.5835 6.84987Z"
        fill="#fff"
        fillOpacity="0.52"
      />
    </svg>
  );
};

export default ExitIcon;
