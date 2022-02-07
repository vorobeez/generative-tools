import {AutomataQuery, State} from './AutomataQuery';

type Options = {
  numberOfTransitions: number;
  stateId: State['id'];
};

type StateSequence = Array<State['id']>;

export function traverseAutomata(
  automataQuery: AutomataQuery,
  options: Options,
): Array<StateSequence> {
  if (options.numberOfTransitions <= 0) {
    return [];
  }

  let transitions = automataQuery.getAvailableTransitions(options.stateId);

  if (options.numberOfTransitions === 1) {
    transitions = transitions.filter((transition) => {
      const toState = automataQuery.getState(transition.to);

      return Boolean(toState?.isFinal);
    });

    return transitions.map((transition) => [transition.output]);
  }

  const mainSequences: Array<StateSequence> = transitions
    .map((transition) => {
      let sequences = traverseAutomata(automataQuery, {
        numberOfTransitions: options.numberOfTransitions - 1,
        stateId: transition.to,
      }).map((sequence) => [transition.output, ...sequence]);

      return sequences;
    })
    .flat();

  return mainSequences;
}
