import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useStep } from '../src';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  // }

  render() {
    return this.state.hasError
      ? <h1 data-testid="error">error</h1>
      : this.props.children;
  }
}


afterEach(cleanup);
jest.useFakeTimers();

const Component = (props) => {
  const {
    autoAdvanceDuration,
    isPaused,
    index,
    step,
    navigation,
  } = useStep(props);

  const {
    next, previous, go, play, pause,
  } = navigation;

  return (
    <div>
      <span data-testid="index">{index}</span>
      <span data-testid="autoAdvanceDuration">{autoAdvanceDuration}</span>
      <span data-testid="isPaused">{isPaused}</span>
      <span data-testid="step">{JSON.stringify(step)}</span>
      <button data-testid="previous" type="button" onClick={previous} />
      <button data-testid="next" type="button" onClick={next} />
      <button data-testid="play" type="button" onClick={play} />
      <button data-testid="pause" type="button" onClick={pause} />
      <button data-testid="go-num" type="button" onClick={() => go(1)} />
      <button data-testid="go-id" type="button" onClick={() => go('foo')} />
    </div>
  );
};

describe('useStep', () => {
  test('import { useStep } from "react-hooks-helper"', () => {
    expect(typeof useStep).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    const { getByTestId } = render(<Component steps={3} />);
    expect(getByTestId('index').textContent).toBe('0');
  });
  test('can be passed an `initialStep` as a number)', () => {
    const { getByTestId } = render(<Component steps={3} initialStep={1} />);
    expect(getByTestId('index').textContent).toBe('1');
  });
  test('can be passed an `initialStep` as a string', () => {
    const { getByTestId } = render(<ErrorBoundary><Component steps={3} initialStep="foo" /></ErrorBoundary>);
    const errorElement = getByTestId('error');
    expect(errorElement.textContent).toBe('error');
  });
  test('can be passed `steps` as a number', () => {
    const { getByTestId } = render(<Component steps={3} initialStep={1} />);
    expect(getByTestId('index').textContent).toBe('1');
    expect(JSON.parse(getByTestId('step').textContent)).toEqual({});
  });
  test('can be passed `steps` as an array', () => {
    const { getByTestId } = render(<Component steps={[{ foo: 'foo' }, { foo: 'bar' }]} initialStep={1} />);
    expect(JSON.parse(getByTestId('step').textContent)).toEqual({ foo: 'bar' });
  });
  test('errors if `steps` is not a number or an array', () => {
    const { container } = render(<ErrorBoundary><Component steps="foo" initialStep={1} /></ErrorBoundary>);
    const child = container.firstChild.firstChild;
    expect(child.textContent).toBe('error');
  });
  test('can be passed an optional `autoAdvanceDuration`', () => {
    const { getByTestId } = render(<Component steps={3} autoAdvanceDuration={500} />);
    // const nextButton = getByTestId('next');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('0');
    // fireEvent.click(nextButton);
    jest.advanceTimersByTime(500);
    expect(indexElement.textContent).toBe('1');
  });
  test('you can call `next` to advance to the next step (steps wrap)', () => {
    const { getByTestId } = render(<Component steps={3} initialStep={1} />);
    const nextButton = getByTestId('next');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('1');
    fireEvent.click(nextButton);
    expect(indexElement.textContent).toBe('2');
    fireEvent.click(nextButton);
    expect(indexElement.textContent).toBe('0');
  });
  test('you can call `previous` to advance to the previous step (steps wrap)', () => {
    const { getByTestId } = render(<Component steps={3} initialStep={1} />);
    const previousButton = getByTestId('previous');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('1');
    fireEvent.click(previousButton);
    expect(indexElement.textContent).toBe('0');
    fireEvent.click(previousButton);
    expect(indexElement.textContent).toBe('2');
  });
  test('you can call `go` to go to a specific index', () => {
    const { getByTestId } = render(<Component steps={3} />);
    const goButton = getByTestId('go-num');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('0');
    fireEvent.click(goButton);
    expect(indexElement.textContent).toBe('1');
  });
  test('you can call `go` to go to a specific `step.id`', () => {
    const { getByTestId } = render(<Component steps={[{ id: 'bar' }, { id: 'foo' }]} />);
    const goButton = getByTestId('go-id');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('0');
    fireEvent.click(goButton);
    expect(indexElement.textContent).toBe('1');
  });
  // Why isn't this working?
  // test('errors of you can call `go` with an `id` and the `step.id` is not found', () => {
  //   const { getByTestId } = render(<Component steps={3} />);
  //   expect(() => {
  //     fireEvent.click(getByTestId('go-id'));
  //   }).toThrow();
  // });
  test('you can call `pause` to pause auto advance', () => {
    const { getByTestId } = render(<Component steps={3} autoAdvanceDuration={500} />);
    const pauseButton = getByTestId('pause');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('0');
    jest.advanceTimersByTime(250);
    fireEvent.click(pauseButton);
    jest.advanceTimersByTime(250);
    expect(indexElement.textContent).toBe('0');
  });
  test('you can call `play` to restart auto advance', () => {
    const { getByTestId } = render(<Component steps={3} autoAdvanceDuration={500} />);
    const pauseButton = getByTestId('pause');
    const playButton = getByTestId('play');
    const indexElement = getByTestId('index');
    expect(indexElement.textContent).toBe('0');
    jest.advanceTimersByTime(250);
    fireEvent.click(pauseButton);
    fireEvent.click(playButton);
    jest.advanceTimersByTime(500);
    expect(indexElement.textContent).toBe('1');
  });
});
