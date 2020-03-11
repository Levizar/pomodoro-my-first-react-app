# pomodoro-my-first-react-app

[pomodoro-my-first-react-app](https://levizar.github.io/pomodoro-my-first-react-app)

## Goal

The goals of this project were to:

Create a Basic static Pomodoro in React

## Technologies

- React (with Hooks)

## Team:

[**Brice Bartoletti**](https://github.com/Levizar)

This project was a solo challenge.

Thanks to my [Woods team-mates](https://github.com/orgs/becodeorg/teams/crl-woods-2-15) from BeCode for helping.

## Comments:

- I developped the projet with react hooks and I had several difficulties using it with the setInterval function.
Indeed, due to the declarative behavior of react, setInterval was refering the initial state of one view and started over and over from this state.
[This article](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) helped me a lot. It gave me a solution and a good explanation with it.

- Developping this project taught me lot about React: 
    - I learned how to use hooks
    - I learned that I can directly use SASS and import it in my React components instead of importing "raw" CSS.
    - I learned how to deploy react app on github (Thanks to [gitname](https://github.com/gitname/react-gh-pages/tree/gh-pages))


## How to test it:

Just visit this site: [pomodoro-my-first-react-app](https://levizar.github.io/pomodoro-my-first-react-app)

### Still todo:

- Change the useEffect hook by useReducer