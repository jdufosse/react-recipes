export default function ListFields({ title, items, onChange, onAdd, onRemove }) {
  return (
    <div className="field">
      <label className="label">{title}</label>

      {items.map((item, index) => (
        <div className="field has-addons" key={index}>
          <div className="control is-expanded">
            <input
              className="input"
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
              placeholder={`${title.slice(0, -1)} ${index + 1}`}
              required
            />
          </div>

          <div className="control">
            <button
              className="button is-danger is-light"
              type="button"
              onClick={() => onRemove(index)}
              disabled={items.length === 1}
              aria-label={`Supprimer ${title.toLowerCase()} ${index + 1}`}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      <button className="button is-link is-light" type="button" onClick={onAdd}>
        Ajouter {title.toLowerCase().slice(0, -1)}
      </button>
    </div>
  );
}