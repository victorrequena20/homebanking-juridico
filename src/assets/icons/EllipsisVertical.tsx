type Props = {
  size?: number;
  color?: string;
};
const EllipsisVertical = ({ size, color }: Props) => {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="48" />
      <circle cx="256" cy="416" r="48" />
      <circle cx="256" cy="96" r="48" />
    </svg>
  );
};

export default EllipsisVertical;
