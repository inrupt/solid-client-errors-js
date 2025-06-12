<!-- When fixing a bug: -->

This PR fixes bug #.

- [ ] I've added a unit test to test for potential regressions of this bug.
- [ ] The changelog has been updated, if applicable.
- [ ] Commits in this PR are minimal and [have descriptive commit messages](https://chris.beams.io/posts/git-commit/).

<!-- When adding a new feature: -->

## New feature description

## Checklist

- [ ] All acceptance criteria are met.
- [ ] Relevant documentation, if any, has been written/updated.
- [ ] The changelog has been updated, if applicable.
- [ ] New functions/types have been exported in `index.ts`, if applicable.
- [ ] New elements of the public API have appropriate API docs (including `@since` and `@example`).
- [ ] New modules (i.e. new `.ts` files) are listed in the `exports` field in `package.json`, if applicable.
- [ ] New modules (i.e. new `.ts` files) are listed in the `typedocOptions.entryPoints` field in `tsconfig.json`, if applicable.
- [ ] Commits in this PR are minimal and [have descriptive commit messages](https://chris.beams.io/posts/git-commit/).

<!-- When cutting a release: -->

This PR bumps the version to <version number>.

## Release Steps

1. Look at the [CHANGELOG.md](../CHANGELOG.md) to determine whether the release should be a major, minor, or patch release. Coordinate with the team to ensure the next version is agreed upon.
2. Run `npm version -- <major|minor|patch> --no-push` with the decided on version (to prevent the tag from being pushed).
3. Update the `CHANGELOG.md` to release the latest the version, and set the release date.
4. Add the `@since X.Y.Z` annotations to new APIs.
5. Commit the changes on a `release/vX.Y.Z` branch
6. Push to GitHub, create a PR, and merge once CI passes.
7. Create a release on GitHub for the new version, using a combination of the release notes from the `CHANGELOG.md` and the automatically generated changes.
   The release should have a new tag matching the new version number: `vx.y.z`, and point to the release commit.
