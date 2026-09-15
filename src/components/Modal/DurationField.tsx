interface DurationFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  required?: boolean;
  checkbox?: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
  };
}

export function DurationField({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  checkbox,
}: DurationFieldProps) {
  return (
    <div className="form-group">
      {checkbox ? (
        <label className="checkbox-label" htmlFor={id}>
          <input
            type="checkbox"
            checked={checkbox.checked}
            onChange={(event) => checkbox.onChange(event.target.checked)}
          />
          <span>{checkbox.label}</span>
        </label>
      ) : (
        <label className="checkbox-label" htmlFor={id}>{label}</label>
      )}

      <div className="input-with-suffix">
        <input
          id={id}
          type="number"
          min="1"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          disabled={disabled}
          required={required}
        />

        <span>sec</span>
      </div>
    </div>
  );
}