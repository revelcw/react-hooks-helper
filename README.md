# react-hooks-helper

[![npm version](https://badge.fury.io/js/react-hooks-helper.svg)](https://badge.fury.io/js/react-hooks-helper)

A custom Hook lib.



## Requirement ⚠️

To use `react-hook-lib`, you must use at minimum `react@16.7.0-alpha.0`. React Hooks is currently at **[RFC](https://github.com/reactjs/rfcs/pull/68)** stage.

## Installation

```sh
npm i react-hooks-helper
```

##
Usage
 
```js
const [bar, notBar] = useNot(bool);
const [{foo, bar}, ] = useForm({foo, bar});
const [bar, notBar] = useTrafficLight([durations]);
```

## Examples

### useNot
`useNot` is a toggle function for react apps
___
Here is a simple App that toggles a value to produce either a **blue** or a **red** square.

#### <a id="useNotBefore"></a>Before

 
```jsx
function App() {
  const [value, setValue] = useState(false);
  return (
    <div
      onClick={ value => (
        setValue( !value )
      )}
      style={{
        width: 100,
        height: 100,
        backgroundColor: value ? 'red' : 'blue'
      }}
    />
  );
```

#### After

```jsx
function App() {
  const [value, notValue] = useNot(false);
  return (
    <div
      onClick={notValue}
      style={{
        width: 100,
        height: 100,
        backgroundColor: value ? 'red' : 'blue'
      }}
    />
  );
}
```


`value`, a boolean, is a variable.
`notValue`function that nots the value from `true` to `false` and vise versa.
Notice the `notValue` is not a lambda function, like in the **[before](#useNotBefore)**

[![Edit useNot  (rhh demo)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rwk86po7rn)

### useForm
`useForm` is for an advanced search, sign-up form, etc, something with a lot of text felds, because you only need to use one hook. Wereas on the otherwise you would need many `useState` hooks
___

#### Before

Right here is some code for a sign-up form. As you can see it is using two `useState` hooks and we need a lambda function to change it

```jsx
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <div className="App">
      <input onChange={ ev => {
        setTextState(ev.target.value)
      }} />
      <div>{text}</div>
      <input onChange={ ev => {
        set(ev.target.value)
      }} />
      <div>{text}</div>
    </div>
  );
}
```
#### After
```jsx
function App() {
  const [{firstName, lastName}, setValue] = useForm({first: "", last: ""});
  return (
    <div className="App">
      <input name="first" onChange={setValue} />
      <div>{firstName}</div>
      <input name="last" onChange={setValue} />
      <div>{lastName}</div>
    </div>
  );
}

```
You see `useForm` takes the name of your `input` and changes the object, so you only have to create one `useForm`.
You can have as many items in the object, and this 
allows many inputs, but with still **_one_** `useForm`.
And it eliminates the use of a lambda function

[![Edit useEvent (rhh demo)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m770pm84n8)

### <a id="usetrafficlight"> </a> useTrafficLight
___

#### Before

```jsx
const lightDurations = [5000, 4000, 1000];

const BeforeTrafficLight = ({ initialColor }) => {
  const [colorIndex, setColorIndex] = useState(initialColor);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setColorIndex((colorIndex + 1) % 3);
      }, lightDurations[colorIndex]);
      return () => clearTimeout(timer);
    },
    [colorIndex]
  );

  return (
    <div className="traffic-light">
      <Light color="#f00" active={colorIndex === 0} />
      <Light color="#ff0" active={colorIndex === 2} />
      <Light color="#0c0" active={colorIndex === 1} />
    </div>
  );
};
```

#### After

```jsx
import { useTrafficLight } from "react-hooks-helper";

const AfterTrafficLight = ({ initialColor }) => {
  const [colorIndex, setColorIndex] = useTrafficLight(initialColor, [5000, 4000, 1000]);

  return ([]
    <div className="traffic-light">
      <Light color="#f00" active={colorIndex === 0} />
      <Light color="#ff0" active={colorIndex === 2} />
      <Light color="#0c0" active={colorIndex === 1} />
    </div>
  );
};
```

[![Edit Traffic light using hooks (rhh demo)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zqo981j4ym)

## My Coding Journey

On Dec 18, 2017, I did a talk at [ReactNYC](https://www.meetup.com/ReactNYC/) about the `useTrafficLight` code above, but it was the "before" code and did not use a custom hook, and _certainly_ not `react-hooks-helper` because it was not out yet!

[![YouTube](https://user-images.githubusercontent.com/29359616/50539855-71bf5100-0b55-11e9-8c83-ac4b920fb5ea.png)](https://www.youtube.com/watch?v=mbiryVTIJ4Q&t=3s)


## License

**[MIT](https://opensource.org/licenses/MIT)** Licensed
