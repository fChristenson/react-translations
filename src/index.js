const React = require("react");
const ReactDom = require("react-dom");
const { IntlProvider, FormattedMessage } = require("react-intl");
const lang = require("./lang");

const App = () => {
  const [locale, setLocale] = React.useState("en");
  const [messages, setMessages] = React.useState();

  React.useEffect(() => {
    lang(locale, "").then(messages => {
      setMessages(messages);
    });
  });

  if (!messages) return null;

  return (
    <IntlProvider messages={messages} locale={locale}>
      <h1>
        <FormattedMessage id="home.hello" />
        &nbsp;
        <FormattedMessage id="home.world" />
      </h1>
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        <option value="en">en</option>
        <option value="sv">sv</option>
      </select>
    </IntlProvider>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
