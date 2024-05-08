import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import User from './components/User';
import Add from './components/Add';
import Edit from './components/Edit';


function App() {

  const route = createBrowserRouter([
    {
      path : "/",
      element : <User/>
    },
    {
      path : "/add",
      element : <Add/>
    },
    {
      path : "/edit/:id",
      element : <Edit/>
    },
  ])
  return (
    <div className="App">
     <RouterProvider router={route}>
     </RouterProvider>
    </div>
  );
}

export default App;
