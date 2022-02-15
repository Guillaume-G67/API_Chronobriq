import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

import jwt_decode from "jwt-decode";
 
var token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiZXhwIjoxNjQ1MDA5MTA4fQ.MC3pAbA6xKUuIcKxO3VbR4MsdHkGKex89zt5loiqLgU/// jwt token";
var decoded = jwt_decode(token);
 
console.log(decoded);
 
/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */
 
// decode header by passing in options (useful for when you need `kid` to verify a JWT):
var decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);
 
/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
