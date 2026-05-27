# Rules

This folder holds client-specific rules that the DomainPolicyAgent consults during review.
Each rule is a Markdown file with a YAML frontmatter `pathGlob` field describing which
changed files trigger it. Rules are matched against the diff and surfaced in the agent
context bundle so reviewers can flag policy violations grounded in your engagement's
domain knowledge.
