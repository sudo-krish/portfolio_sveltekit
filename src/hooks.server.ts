// src/hooks.server.ts

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// ============================================
	// SECURITY HEADERS (Updated for External Scripts)
	// ============================================

	// 1. Strict-Transport-Security (HSTS)
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=63072000; includeSubDomains; preload'
	);

	// 2. X-Frame-Options
	response.headers.set('X-Frame-Options', 'DENY');

	// 3. X-Content-Type-Options
	response.headers.set('X-Content-Type-Options', 'nosniff');

	// 4. Referrer-Policy
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// 5. Permissions-Policy
	response.headers.set(
		'Permissions-Policy',
		'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
	);

	// 6. X-XSS-Protection (legacy)
	response.headers.set('X-XSS-Protection', '1; mode=block');

	// 7. Content-Security-Policy (UPDATED - Allow Google Analytics + Cloudflare)
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com", // Added external domains
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data: https: https://www.google-analytics.com https://www.googletagmanager.com", // Added analytics domains
		"font-src 'self' data:",
		"connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.github.com https://leetcode.com", // Added analytics endpoints
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'"
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);

	// 8. Remove conflicting CORS header (if exists)
	response.headers.delete('Access-Control-Allow-Origin');

	return response;
};
