import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Todo } from './todo/Todo'
import { Summary } from './summary/Summary'
import { Header } from './common/Header'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import "../style/index.css"




const App: React.FC = () => {

  return (
    <div>
      <Header />
      <Switch>
        <Route path={['/', '/index']} exact strict component={Todo} />
        <Route path={'/summary'} exact strict component={Summary} />
      </Switch>
    </div>
  )
}

export default App;
