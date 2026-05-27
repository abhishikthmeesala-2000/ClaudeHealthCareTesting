# Evals

This folder holds eval cases that measure review quality on representative diffs.
Each case names a fixture, a base/head ref, expected findings, and an expected policy
decision. The eval runner replays cases through the full pipeline with a deterministic
mock provider, and produces precision/recall metrics so you can track review quality
over time.
