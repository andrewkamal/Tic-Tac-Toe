import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(initialName);

  function ChangeEdit() {
    setIsEdit((editing) => !editing);
    if (isEdit) onChangeName(symbol, name);
  }

  function ChangeName(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEdit ? (
          <span className="player-name">{name}</span>
        ) : (
          <input
            type="text"
            required
            value={name}
            onChange={ChangeName}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={ChangeEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
