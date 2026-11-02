import type { RestConfig } from "../../../../models/workout";
import { formatTime } from "../../../../utils/time";
import "./RestAction.css";

export function RestAction({
  rest,
  onStart,
}: {
  rest?: RestConfig;
  onStart: (label: string, seconds: number) => void;
}) {
  if (!rest?.enabled || rest.seconds <= 0) {
    return null;
  }

  return (
    <button
      type="button"
      className="execution-rest-button"
      onClick={() => onStart("Rest", rest.seconds)}
    >
      Start {formatTime(rest.seconds)} rest
    </button>
  );
}
// function formatTime(seconds: number): string {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
// }
