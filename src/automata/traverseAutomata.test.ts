import {AutomataQueryBuilder} from './AutomataQueryBuilder';
import {traverseAutomata} from './traverseAutomata';

describe('traverseAutomata', () => {
  const builder = new AutomataQueryBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('generates a sequence from one-state automata', () => {
    builder.addTransition(0, 0, 0);

    const automata = builder.build();

    expect(
      traverseAutomata(automata, {numberOfTransitions: 3, stateId: 0}),
    ).toEqual([[0, 0, 0]]);
  });

  it('generates a sequence from multiple-state automata', () => {
    builder.addState(0, false);
    builder.addState(1, true);
    builder.addState(2, true);
    builder.addTransition(0, 1, 1);
    builder.addTransition(0, 2, 2);
    builder.addTransition(1, 2, 2);
    builder.addTransition(2, 1, 1);

    const automata = builder.build();

    expect(
      traverseAutomata(automata, {numberOfTransitions: 4, stateId: 0}),
    ).toEqual([
      [1, 2, 1, 2],
      [2, 1, 2, 1],
    ]);
  });

  it("returns an empty array if can't produce a sequence of required size", () => {
    builder.addState(0, false);
    builder.addTransition(0, 0, 0);

    const automata = builder.build();

    expect(
      traverseAutomata(automata, {numberOfTransitions: 1, stateId: 0}),
    ).toEqual([]);
  });
});
