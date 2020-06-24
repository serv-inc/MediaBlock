/** @fileinfo react toggle switch

based upon https://upmostly.com/tutorials/build-a-react-switch-toggle-component
*/
const Switch = () => {
  return (
    <div>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;
