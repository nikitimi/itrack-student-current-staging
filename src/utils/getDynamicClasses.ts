export default function getDynamicClasses(condition: boolean) {
  return `${condition ? 'bg-black text-white' : ''} hover:bg-blue-500 hover:text-white`;
}
