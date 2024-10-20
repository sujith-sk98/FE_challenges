import { Link } from 'react-router-dom';
import './App.scss';

function App() {

  const challenges = [{name: 'Star Component', path: 'star'},
    {name : 'Sortable List', path: 'sortList'}
  ]

  return (
    <div className='app'>
      <h1>
        Challenges
      </h1>
      <ul>
        {challenges.map((item) => {
          return ( <li><Link className='linkClass' to={item.path}>{item.name}</Link></li>)
        })}
      </ul>
    </div>
  );
}

export default App;
