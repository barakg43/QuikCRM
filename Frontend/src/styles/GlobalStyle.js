import { createGlobalStyle } from "styled-components";
import "./pollen.css";
const GlobalStyle = createGlobalStyle`
:root{

    &, &.light-mode{



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

/* min body height */

body {
  min-height: 100dvh;
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
