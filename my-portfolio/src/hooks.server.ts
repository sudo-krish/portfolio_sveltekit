// src/hooks.server.ts

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Security Headers for Cloudflare Pages
	const securityHeaders = {
		// Content Security Policy (strict)
		'Content-Security-Policy': [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Vite needs these in dev
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https:",
			"font-src 'self' data:",
			"connect-src 'self' https://api.github.com https://leetcode.com",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'"
		].join('; '),

		// Strict Transport Security
		'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

		// X-Frame-Options
		'X-Frame-Options': 'DENY',

		// X-Content-Type-Options
		'X-Content-Type-Options': 'nosniff',

		// Referrer Policy
		'Referrer-Policy': 'strict-origin-when-cross-origin',

		// Permissions Policy (disable unnecessary features)
		'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',

		// X-XSS-Protection (legacy but recommended)
		'X-XSS-Protection': '1; mode=block',

		// Cross-Origin Policies
		'Cross-Origin-Resource-Policy': 'same-origin',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp'
	};

	// Apply all headers
	Object.entries(securityHeaders).forEach(([key, value]) => {
		response.headers.set(key, value);
	});

	return response;
};
