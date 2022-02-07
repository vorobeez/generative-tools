export type State = {id: number; isFinal: boolean};

export type Transition = {
  from: State['id'];
  to: State['id'];
  output: number;
};

export class AutomataQuery {
  private states: Map<State['id'], State>;
  private transitionFromMap: Map<State['id'], Array<Transition>>;
  private initialStateId: State['id'];

  constructor(
    states: Map<State['id'], State>,
    transitions: Array<Transition>,
    initialStateId: State['id'],
  ) {
    this.states = states;
    this.initialStateId = initialStateId;
    this.transitionFromMap = new Map();

    transitions.forEach((transition) => {
      const accum = this.transitionFromMap.get(transition.from) ?? [];

      this.transitionFromMap.set(transition.from, [...accum, transition]);
    });
  }

  getAvailableTransitions(id: State['id']): Array<Transition> {
    return this.transitionFromMap.get(id) ?? [];
  }

  getInitialState(): State {
    return this.states.get(this.initialStateId) as State;
  }

  getState(id: State['id']): State | undefined {
    return this.states.get(id);
  }
}
