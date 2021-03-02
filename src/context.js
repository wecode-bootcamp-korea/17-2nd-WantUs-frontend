import React from 'react'

const Context = React.createContext();
const Consumer = Context.Consumer;

function Provider() {
  return (
    <Context.Provider>
      {/* {this.props.children} */}
    </Context.Provider>
  )
}

export {Provider, Consumer};

