import "./Toastify.css";

export default function Toastify({ content, isToastifyOpen = false }) {
  return (
    <div
      className={`toastifyBody ${isToastifyOpen ? "toastifyBody--open" : ""}`}
    >
      {content}
    </div>
  );
}
