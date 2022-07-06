import { getGreeting } from './mod.ts';
import { assertEquals, assertNotEquals } from './deps.ts';

Deno.test('should_get_valid_greeting', () => {
	const greeting = getGreeting();
	assertEquals(greeting, `\x1b[1mHello World from 🦕\x1b[22m`);
});

Deno.test('should_not_get_empty_greeting', () => {
	const greeting = getGreeting();
	assertNotEquals(greeting, '');
});
