import edit from './Edit'
import './styles/style.sass'
import './styles/editor.sass'

const { registerBlockType } = wp.blocks;

registerBlockType( 'examples/basic-esnext', {
	title: 'Example',
	icon: 'universal-access-alt',
	category: 'layout',
  edit: edit,
  save() {
    return ''
  }
})