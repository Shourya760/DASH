export function InputField({
  id,
  label,
  error,
  className = '',
  inputClassName = '',
  ...inputProps
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label htmlFor={id} className="text-lg font-bold text-slate-800 dark:text-slate-100 md:text-xl">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-4 text-lg text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/25 md:min-h-[56px] md:text-xl ${error ? 'border-red-500' : ''} ${inputClassName}`}
        {...inputProps}
      />
      {error ? <p className="text-base text-red-600 dark:text-red-400 md:text-lg">{error}</p> : null}
    </div>
  )
}
