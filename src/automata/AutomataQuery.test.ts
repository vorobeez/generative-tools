import {AutomataQuery} from './AutomataQuery';

describe('Automata', () => {
  const states = new Map();
  states.set(0, {id: 0, isFinite: true});
  states.set(1, {id: 1, isFinite: false});
  states.set(2, {id: 2, isFinite: true});
  const transitions = [
    {from: 0, to: 0, output: 0},
    {from: 0, to: 1, output: 1},
    {from: 1, to: 2, output: 1},
    {from: 2, to: 0, output: 0},
  ];
  const automata = new AutomataQuery(states, transitions, 0);

  it('shows available transition from the current state', () => {
    const availableTransitions = automata.getAvailableTransitions(
      automata.getInitialState().id,
    );

    expect(availableTransitions).toEqual([
      {from: 0, to: 0, output: 0},
      {from: 0, to: 1, output: 1},
    ]);
  });
});
