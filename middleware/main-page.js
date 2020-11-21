export default function ({ from, redirect }) {
  if (from.name === 'index') {
    redirect('/catalog/1')
  }
}
