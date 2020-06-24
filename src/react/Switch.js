/** @fileinfo react toggle switch

based upon https://upmostly.com/tutorials/build-a-react-switch-toggle-component
*/
const Switch = ({ isOn, handleToggle, label }) => {
  return (
    <span>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn ? "#06D6A0" : "red" }}
      >
        <span className={`react-switch-button`}>{label}</span>
      </label>
    </span>
  );
};

export default Switch;
