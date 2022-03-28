module.exports = {
	extends: ['@commitlint/config-conventional'],
	ignores: [message => /^Bumps \[.+]\(.+\) from .+ to .+\.$/m.test(message)],
	rules: { 'body-max-line-length': [1, 'always', 100] },
    parserPreset: { parserOpts: { noteKeywords: ['\\[.+\\]:'] } },
};
