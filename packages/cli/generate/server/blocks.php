<?php
/**
 * Blocks Initializer
 * Enqueue CSS/JS of all the blocks.
 * @package Gutenblock
 */

if (!defined( 'ABSPATH')) exit;

// Define Variables and Functions
function plugins_name($name) {
  return '<%=name%>' . $name;
}

/**
 * Block assets.
 * Enqueue block assets, these are the result of the build.
 **/

add_action('enqueue_block_assets', '<%=namespace%>_enqueue_block_assets');

function <%=namespace%>_enqueue_block_assets() {
  wp_enqueue_script(
    plugins_name('-block'),
    // plugins_url( '../build/blocks.build.js', dirname(__FILE__)),
    'http://localhost:9000/block.build.js',
    ['wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components']
  );

  wp_enqueue_style(
    plugins_name('-block-css'),
    // plugins_url( '../build/blocks.editor.build.css', dirname(__FILE__)),
    'http://localhost:9000/editor.build.css',
    array('wp-edit-blocks')
  );
}

/**
 * Frontend assets.
 * Enqueue the block's assets for the frontend.
 **/

add_action( 'enqueue_block_assets', '<%=namespace%>_enqueue_frontend_assets' );

function <%=namespace%>enqueue_frontend_assets() {
	wp_enqueue_style(
    plugins_name('-frontend-css'),
    // plugins_url( '../build/blocks.style.build.css', dirname(__FILE__)),
    'http://localhost:9000/style.build.css',
		array() 
  );
}

/**
 * Frontend assets.
 * Enqueue the block's assets for the frontend.
 **/

foreach (glob("./**/block.php") as $filename) {
  require_once($filename);
}