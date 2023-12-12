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
  

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}
}

//     CSS RESET
/* remove default spacing */
/* force styling of type through styling, rather than elements */

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

/* dark mode user-agent-styles */

html {
  color-scheme: dark light;
}
a {
  color: inherit;
  text-decoration: none;
}
ul ,menu{
  list-style: none;
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
`;

export default GlobalStyle;
