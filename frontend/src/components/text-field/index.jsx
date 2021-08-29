export default function TextField({ type = 'text', label, placeholder, value, onChange = () => { }, }) {
  const id = label
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(/[^a-z]+/g, ''))
    .join();

  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        onChange={(e) => onChange(e.target.value, e)}
        className='w-100 bg-transparent input-style rounded p-2'
        type={type} id={id} placeholder={''}
      />
    </div>
  );
}