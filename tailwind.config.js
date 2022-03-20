module.exports = {
  // mode: "jit", // this will enable Tailwind JIT compiler to make the build faster
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'], // Here we are going to tell Tailwind to use any .ts or .tsx file to purge the CSS
  darkMode: 'media', // Use media queries for dark mode, customize it as you want
  variants: {}, // activate any variant you want here
  plugins: [] // add any plugin you need here
}
