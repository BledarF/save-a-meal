import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstructionsCard(props) {
  const { icon, title, desc } = props;
  return (
    <div className="relative flex flex-col justify-evenly items-center h-80 rounded-3xl cursor-pointer my-5 shadow-lg p-3">
      <FontAwesomeIcon icon={icon} size="3x" style={{ color: "#F59E0B" }} />
      <h1 className="text-2xl">{title}</h1>
      <h1 className="text-base">{desc}</h1>
    </div>
  );
}
export default InstructionsCard;
