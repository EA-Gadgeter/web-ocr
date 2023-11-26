import { Title } from "@/components/Title";
import { MainForm } from "./components/MainCard";

const App = () => {

  return (
    <div 
      className="
        h-screen 
        flex justify-center items-center flex-col
        bg-white
      "
    >
      <Title />

      <MainForm />
    </div>
  );
};

export default App;
