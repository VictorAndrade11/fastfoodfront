export function RadioComponent({ name, isChecked, icon, value, onChange }) {
  return (
    <div
      className={`flex items-center justify-between w-full h-16 gap-4 p-8 border border-black-100 rounded-md cursor-pointer ${
        isChecked ? " border-green-500" : ""
      } relative`}
      onClick={() => onChange()}
    >
      <span className="flex gap-4 items-center self-center ">
        {icon}
        <label className="font-bold text-xl" htmlFor={name}>
          {value}
        </label>
      </span>
      <input
        className="accent-pink-500 jurandir"
        type="radio"
        name={name}
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  );
}
