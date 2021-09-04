export default function Button({ children, onClick = () => { }, type = 'button' }) {
  return (
    <div className='col-md-auto'>
      <button
        type={type}
        onClick={() => onClick()}
        className='p-1 bg-transparent border-0'>
        {children}
      </button>
    </div>
  );
}