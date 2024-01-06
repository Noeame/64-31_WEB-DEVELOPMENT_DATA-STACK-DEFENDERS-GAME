<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp-server' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '!{V|:DC,+*y(-uZP.(#;Pj^-YS/S%BUV2ch}P^DlR|<@E6h9`zxv.?FwgZjI}SzM' );
define( 'SECURE_AUTH_KEY',  'FRI+4~^1][Q@P)>5]Jaj68Le7,Y3|,cH>U]f=qX7jhu_`A4sz5TvI3mJ{iWFph2X' );
define( 'LOGGED_IN_KEY',    'OcFMmC?F<(J-Wk 64#E-eN4@1vp;-7@KXF9?p.*D*Na;|2F$`sH&=|~+ioE5+A)(' );
define( 'NONCE_KEY',        '(A=**Q=d]3i{@naF]G$5Uw>tUdCj&`Ip&F{e-%3UWe6iDO146+Sv9<0UnRY)zt%x' );
define( 'AUTH_SALT',        'x^DT8_]4v=9[DNZ[;>D7JNA4$Ta#TDU~O;i;,;g$AEMLk5Ncu-w(Bd[khzL`}7:%' );
define( 'SECURE_AUTH_SALT', 'Mh$o6]|Im):nCrkX}IAchr 6hfz^j8 o/xvs<kU{>5Q Q7$a|0Ja@[-nxzc_0Lv5' );
define( 'LOGGED_IN_SALT',   '4$8AhO]e`tRcl,TU3}4zm4DATA~KrFRc#aY,GX|NnO$k2{:CWvKzBv%~NxxXmFZT' );
define( 'NONCE_SALT',       '6.K9GUBY&z<qN,tg_fH?36 ?d%d5Qt0D jUL u^@,H::tH+0]M}sgF-?/@ O?$E1' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
