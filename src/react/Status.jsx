/** @fileinfo show status of current page */
import Switch from "./Switch.js";

const Status = ({ name, isOk, onClick }) => {
  return (
    <div>
      <p>
        {name} is
        <Switch
          isOn={isOk}
          handleToggle={onClick}
          label={isOk ? "good" : "bad"}
        />
        company
      </p>
    </div>
  );
};

export default Status;
