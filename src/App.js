import logo from "./logo.svg";
import "./App.css";
import { TypingLesson } from "./components/TypingLesson";
const dummyLesson = {
  title: "Lesson 1",
  text: "This is the first lesson",
};
function App() {
  return (
    <div className="App">
      <TypingLesson lesson={dummyLesson} />
    </div>
  );
}

export default App;
