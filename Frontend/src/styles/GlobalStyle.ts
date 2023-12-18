import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
    &, &.light-mode{
        --color-primary-100:var(--color-teal-100)
        --color-primary-200:var(--color-teal-200)
        --color-primary-300:var(--color-teal-300)
        --color-primary-400:var(--color-teal-400)
        --color-primary-500:var(--color-teal-500)
        --color-primary-600:var(--color-teal-600)
        --color-primary-700:var(--color-teal-700)
        --color-primary-800:var(--color-teal-800)
        --color-primary-900:var(--color-teal-900)
        --color-primary-950:var(--color-teal-950)
    }
}
  //     CSS RESET

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }




  html {
    color-scheme: dark light;
    font-size: 62.5%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul ,menu{
    list-style: none;
  }
  button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

  body,html {
    font-family: "Poppins", sans-serif;
    color: var(--color-grey-700);
    margin: 0;
    transition: color 0.3s, background-color 0.3s;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    font-size: 1.6rem;
  }
  input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}
  /* responsive images/videos */
  img,
  picture,
  svg,
  video {
  max-width:100%;
  height:auto;
  background-repeat:no-repeat;
  background-size:cover;
  vertical-align:middle;
  font-style:italic;
  shape-margin:0;

  }
  /* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}
  p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}
a {
  color: inherit;
  text-decoration: none;
}


`;

export default GlobalStyle;
