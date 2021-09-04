export default function TextField({
  type = 'text', label, value,
  onChange = () => { }, onBlur = () => { },
  disabled = false
}) {
  const id = label
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(/[^a-z]+/g, ''))
    .join('-');

  return (
    <>
      <div>
        <label htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        onChange={(e) => onChange(e.target.value, e)}
        onBlur={(e) => onBlur(e.target.value, type, e)}
        value={value}
        disabled={disabled}
        className='w-100 bg-transparent input-style rounded p-2'
        type={type} id={id} placeholder=''
      />
    </>
  );
}