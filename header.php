<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_site_icon(); ?>
	<?php 
		/* Always have wp_head() just before the closing </head>
		 * tag of your theme, or you will break many plugins, which
		 * generally use this hook to add elements to <head> such
		 * as styles, scripts, and meta tags.
		 */
		wp_head(); 
	?>
</head>
<body <?php body_class(); ?>>
<!-- Start Loader -->
<div class="pace"></div>
<!-- End Loader -->
<div id="wrapper" class="open">
	
	<!-- Start Mobile Menu -->
	<?php get_template_part( 'inc/templates/header/mobile_menu'); ?>
	<!-- End Mobile Menu -->
	
	<!-- Start Quick Cart -->
	<?php do_action( 'thb_side_cart' ); ?>
	<!-- End Quick Cart -->
		
	<!-- Start Header -->
	<?php get_template_part( 'inc/templates/header/'.ot_get_option('header_style', 'style1') ); ?>
	<!-- End Header -->
	
	<?php do_action('thb_site_bars'); ?>
	
	<div role="main">