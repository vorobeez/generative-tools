import {Transition, State, AutomataQuery} from './AutomataQuery';

export class AutomataQueryBuilder {
  private states: Map<State['id'], State>;
  private transitions: Array<Transition>;
  private initialStateId: State['id'];

  constructor() {
    this.states = new Map();
    this.transitions = [];
    this.initialStateId = 0;
    this.addState(0, true);
  }

  addState(id: State['id'], isFinal: State['isFinal']): AutomataQueryBuilder {
    this.states.set(id, {id, isFinal});

    return this;
  }

  addTransition(
    from: State['id'],
    to: State['id'],
    output: Transition['output'],
  ): AutomataQueryBuilder {
    this.transitions.push({from, to, output});
    return this;
  }

  setInitialState(id: State['id']): AutomataQueryBuilder {
    if (!this.states.has(id)) {
      throw new Error(`There's no state with id = ${id}`);
    }

    this.initialStateId = id;

    return this;
  }

  reset(): AutomataQueryBuilder {
    this.states = new Map();
    this.transitions = [];
    this.initialStateId = 0;
    this.addState(0, true);

    return this;
  }

  build(): AutomataQuery {
    return new AutomataQuery(
      this.states,
      this.transitions,
      this.initialStateId,
    );
  }
}
