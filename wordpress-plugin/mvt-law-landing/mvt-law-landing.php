<?php
/**
 * Plugin Name: MVT Law — Landing Page
 * Plugin URI:  https://mvtlaw.com.br/
 * Description: Landing page institucional da MVT Law, com template de página exclusivo e shortcode opcional.
 * Version:     1.0.3
 * Author:      4Juris
 * Author URI:  https://somos4juris.com.br/
 * Text Domain: mvt-law-landing
 * Requires at least: 6.2
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

define('MVT_LAW_LANDING_VERSION', '1.0.3');
define('MVT_LAW_LANDING_FILE', __FILE__);
define('MVT_LAW_LANDING_DIR', plugin_dir_path(__FILE__));
define('MVT_LAW_LANDING_URL', plugin_dir_url(__FILE__));

/**
 * Adds the landing page template to the page editor.
 */
function mvt_law_landing_register_page_template($templates)
{
    $templates['mvt-law-landing-template.php'] = __('MVT Law — Landing Page', 'mvt-law-landing');

    return $templates;
}
add_filter('theme_page_templates', 'mvt_law_landing_register_page_template');

/**
 * Uses the plugin template when it is selected for a page.
 */
function mvt_law_landing_template_include($template)
{
    if (is_singular('page') && get_page_template_slug(get_queried_object_id()) === 'mvt-law-landing-template.php') {
        return MVT_LAW_LANDING_DIR . 'templates/landing-page.php';
    }

    return $template;
}
add_filter('template_include', 'mvt_law_landing_template_include');

/**
 * Checks whether the current request needs the landing page assets.
 */
function mvt_law_landing_is_active()
{
    if (!is_singular('page')) {
        return false;
    }

    $page_id = get_queried_object_id();

    if (get_page_template_slug($page_id) === 'mvt-law-landing-template.php') {
        return true;
    }

    $page = get_post($page_id);

    return $page instanceof WP_Post && has_shortcode($page->post_content, 'mvt_law_landing_page');
}

/**
 * Reads Vite's manifest and enqueues the compiled application.
 */
function mvt_law_landing_enqueue_assets()
{
    static $enqueued = false;

    if ($enqueued) {
        return true;
    }

    $manifest_path = MVT_LAW_LANDING_DIR . 'build/manifest.json';

    if (!is_readable($manifest_path)) {
        return false;
    }

    $manifest = json_decode((string) file_get_contents($manifest_path), true);
    $entry = is_array($manifest) ? ($manifest['src/main.jsx'] ?? null) : null;

    if (!is_array($entry) || empty($entry['file'])) {
        return false;
    }

    foreach (($entry['css'] ?? array()) as $index => $css_file) {
        wp_enqueue_style(
            'mvt-law-landing-' . $index,
            MVT_LAW_LANDING_URL . 'build/' . ltrim($css_file, '/'),
            array(),
            MVT_LAW_LANDING_VERSION
        );
    }

    wp_enqueue_script(
        'mvt-law-landing-app',
        MVT_LAW_LANDING_URL . 'build/' . ltrim($entry['file'], '/'),
        array(),
        MVT_LAW_LANDING_VERSION,
        true
    );

    $enqueued = true;

    return true;
}

function mvt_law_landing_enqueue_when_needed()
{
    if (mvt_law_landing_is_active()) {
        mvt_law_landing_enqueue_assets();
    }
}
add_action('wp_enqueue_scripts', 'mvt_law_landing_enqueue_when_needed', 99);

/**
 * Vite outputs an ES module, so its script tag must include type="module".
 */
function mvt_law_landing_module_script($tag, $handle)
{
    if ($handle !== 'mvt-law-landing-app') {
        return $tag;
    }

    return str_replace('<script ', '<script type="module" ', $tag);
}
add_filter('script_loader_tag', 'mvt_law_landing_module_script', 10, 2);

/**
 * Optional shortcode for sites that cannot use a custom page template.
 */
function mvt_law_landing_shortcode()
{
    if (!mvt_law_landing_enqueue_assets()) {
        return current_user_can('manage_options')
            ? '<p>' . esc_html__('Os arquivos compilados da landing page não foram encontrados.', 'mvt-law-landing') . '</p>'
            : '';
    }

    return '<div id="root" class="mvt-law-landing-root"></div>';
}
add_shortcode('mvt_law_landing_page', 'mvt_law_landing_shortcode');

/**
 * Adds a quick usage link to the Plugins screen.
 */
function mvt_law_landing_action_links($links)
{
    $help_link = '<a href="' . esc_url(admin_url('edit.php?post_type=page')) . '">' . esc_html__('Criar página', 'mvt-law-landing') . '</a>';
    array_unshift($links, $help_link);

    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'mvt_law_landing_action_links');
