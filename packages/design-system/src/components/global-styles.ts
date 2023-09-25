import style from './styles/global-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(`${style}`);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

export {};
