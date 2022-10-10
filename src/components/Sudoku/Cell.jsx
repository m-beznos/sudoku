import { useEffect, useState } from "react";

const Cell = ({ value, updateValue, readOnly }) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    updateValue(v);
  }, [updateValue, v]);

  const onChange = (e) => {
    const value = e.target.value;
    if (value) {
      const number = parseInt(value);
      if (isNaN(number)) {
        setV("");
        return;
      }

      if (number > 0 && number < 10) {
        setV(number.toString());
        return;
      }

      return;
    }

    setV("");
  };

  return (
    <td className="cell">
      <input readOnly={readOnly} value={v} onChange={onChange} type="number" />
    </td>
  );
};

export default Cell;
