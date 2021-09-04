export default function Button({
  children, onClick = () => { }, type = 'button',
  className = 'p-1 bg-transparent border-0',
  divClass,
}) {
  return (
    <div className={divClass}>
      <button
        type={type}
        onClick={(e) => onClick(e)}
        className={className}>
        {children}
      </button>
    </div>
  );
}