import MongoId from "./features/mongo-id";
import UUIDGenerator from "./features/uuid";

function App() {
  return (
    <div className="grid gap-8 p-8">
      <UUIDGenerator />
      <MongoId />
    </div>
  );
}

export default App;
