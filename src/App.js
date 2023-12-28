import logo from "./logo.svg";
import "./App.css";
import { TypingLesson } from "./components/TypingLesson";
const dummyLesson = {
  title: "Beginner 1",
  subtitle: "Introduction",
  text: "This ",
};
function App() {
  return (
    <div className="App">
      <TypingLesson lesson={dummyLesson} />
    </div>
  );
}

export default App;
