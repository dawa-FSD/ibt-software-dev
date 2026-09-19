export default function Field({ label, id, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {children}

      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
