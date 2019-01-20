import useStep from './useStep';

const useTrafficLight = (initialStep = 0, durations = [5000, 4000, 1000]) => {
  const steps = durations.map(msecs => ({ autoAdvanceDuration: msecs }));
  return useStep({ initialStep, steps }).index;
};

export default useTrafficLight;
