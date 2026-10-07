<?php
/**
 * Full-page template for the MVT Law landing page.
 *
 * @package MvtLawLanding
 */

if (!defined('ABSPATH')) {
    exit;
}

mvt_law_landing_enqueue_assets();
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <style id="mvt-law-landing-isolation">
        html,
        body.mvt-law-landing-page {
            width: 100% !important;
            max-width: none !important;
            min-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        html {
            font-size: 16px !important;
        }

        body.mvt-law-landing-page {
            display: block !important;
            overflow-x: hidden !important;
            background: #f7f5f0 !important;
        }

        body.mvt-law-landing-page #root {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 16px !important;
            line-height: 1.5;
            font-family: Manrope, Arial, sans-serif;
        }

        body.mvt-law-landing-page #root .site-header {
            width: 100%;
            height: auto;
            min-height: 0;
            margin: 0;
            padding: 0;
        }

        body.mvt-law-landing-page #root .container {
            max-width: none;
            padding-right: 0;
            padding-left: 0;
        }

        body.mvt-law-landing-page #root :is(.brand, .nav, footer) {
            margin: 0;
        }

        body.mvt-law-landing-page #root :is(a, button, input, textarea, select, p, span, small, label, summary, address) {
            font-family: Manrope, Arial, sans-serif;
        }
    </style>
</head>
<body <?php body_class('mvt-law-landing-page'); ?>>
<?php wp_body_open(); ?>
<div id="root" class="mvt-law-landing-root"></div>
<?php wp_footer(); ?>
</body>
</html>
