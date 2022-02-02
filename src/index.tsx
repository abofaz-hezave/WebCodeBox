import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <Provider store={store}>
      <TextEditor />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
