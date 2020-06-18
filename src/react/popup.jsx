function formatDomain(domain) {
  return domain.name + " is " + domain.isGood ? "good " : "bad " + " company";
}

const domain = {
  name: document.location.host,
  isGood: true,
};

const element = <h1>Hello, {formatDomain(domain)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));
