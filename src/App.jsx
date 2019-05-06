import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: this.state.nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      items: prevState.items.concat([newItem])
    })));
  }

  clearCompletedItems() {
    // TODO 6
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let allItems = this.state.items.slice();
    for (var i = 0; i < allItems.length; i++) {
      let item = allItems[i];
      if (item.id == itemId) {
          allItems[i].sessionsCompleted += 1;
      }
    }
    this.setState({items: allItems});
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
      let allItems = this.state.items.slice();
      for (var i = 0; i < allItems.length; i++) {
          let item = allItems[i];
          if (item.id == itemId) {
              allItems[i].isCompleted = true;
          }
      }
      this.setState({items: allItems});
  }

  startSession(id) {
    // TODO 4
    this.setState((prevState)=> ({sessionIsRunning: true, itemIdRunning: id}))
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    const isEmpty = this.state.items.length == 0;

    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
              {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {this.state.sessionIsRunning && <Timer mode="WORK"
                                                 onSessionComplete={() => this.increaseSessionsCompleted(this.state.itemIdRunning)}
                                                 autoPlays={true}
                                                 key={this.state.itemIdRunning}/>}
            <div className="items-container">
            {isEmpty ? <EmptyState/> :
                this.state.items.filter((item) => !item.isCompleted).map((item) => <TodoItem description={item.description}
                                                      sessionsCompleted={item.sessionsCompleted}
                                                      isCompleted={item.isCompleted}
                                                      startSession={() => this.startSession(item.id)}
                                                      key={item.id}
                                                      toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}/>
            )}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
