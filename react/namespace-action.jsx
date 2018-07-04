const makeNamespacedBox = (namespace = uuid()) => {
  
  const actions = {
    onUpdateHue: (hue) => {
      return { type: 'UPDATE_HUE', hue, namespace }
    },
    onResetHue: () => {
      return { type: 'RESET_HUE', namespace }
    }
  };
  
  const reducer = (state={}, action) => {
    if (action.namespace !== namespace) {
      return state;
    }
    
    switch (action.type) {
      case 'UPDATE_HUE':
        return Object.assign(
          {}, state, 
          {hue: action.hue + 30}) 
      case 'RESET_HUE':
        return Object.assign(
          {}, state, 
          {hue: 10}) 
      default:
        return state;
    } 
  };
  
  const Component = ({state, dispatch }) => {
    return (
      <HueBoxDisplay
        state={state}
        updateHue={(currentHue) => dispatch(actions.onUpdateHue(currentHue))}
        resetHue={() => dispatch(actions.onResetHue())}
      />
    );
  };
  
  return { Component, actions, namespace, reducer };
}