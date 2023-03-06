# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added Dutch translation

### Fixed

- Fixed foldouts in Dutch translation

## [1.0.0-alpha.13] - 2023-03-05

### Added

- Added a new `useCheckSensorsAvailability` hook to check whether all sensors are available on the device.
- Added a new component `EmptySessionsHistory` to render when there are no sessions in the history, along with a button to start a new session.
- Added new fields inside session metadata - `isAccelerometerAvailable`, `isGyroscopeAvailable`, and `isMagnetometerAvailable` - to indicate the availability of these sensors on the device.
- Added a `prebuild:android` script to pre-build the Android code.

### Changed

- Rewrote the navigation system completely to interact better with typescript.
- Migrated from `expo-sensors` to `react-native-sensors`.
- Slightly modified the `usePreventNavigationBack` hook to prevent the back button only when the session is active.
- Avoid subscribing to a sensor if it is not available on the device.

[//]: # (## [1.0.0] - 2017-06-20)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- New visual identity by [@tylerfortune8]&#40;https://github.com/tylerfortune8&#41;.)

[//]: # (- Version navigation.)

[//]: # (- Links to latest released version in previous versions.)

[//]: # (- "Why keep a changelog?" section.)

[//]: # (- "Who needs a changelog?" section.)

[//]: # (- "How do I make a changelog?" section.)

[//]: # (- "Frequently Asked Questions" section.)

[//]: # (- New "Guiding Principles" sub-section to "How do I make a changelog?".)

[//]: # (- Simplified and Traditional Chinese translations from [@tianshuo]&#40;https://github.com/tianshuo&#41;.)

[//]: # (- German translation from [@mpbzh]&#40;https://github.com/mpbzh&#41; & [@Art4]&#40;https://github.com/Art4&#41;.)

[//]: # (- Italian translation from [@azkidenz]&#40;https://github.com/azkidenz&#41;.)

[//]: # (- Swedish translation from [@magol]&#40;https://github.com/magol&#41;.)

[//]: # (- Turkish translation from [@emreerkan]&#40;https://github.com/emreerkan&#41;.)

[//]: # (- French translation from [@zapashcanon]&#40;https://github.com/zapashcanon&#41;.)

[//]: # (- Brazilian Portuguese translation from [@Webysther]&#40;https://github.com/Webysther&#41;.)

[//]: # (- Polish translation from [@amielucha]&#40;https://github.com/amielucha&#41; & [@m-aciek]&#40;https://github.com/m-aciek&#41;.)

[//]: # (- Russian translation from [@aishek]&#40;https://github.com/aishek&#41;.)

[//]: # (- Czech translation from [@h4vry]&#40;https://github.com/h4vry&#41;.)

[//]: # (- Slovak translation from [@jkostolansky]&#40;https://github.com/jkostolansky&#41;.)

[//]: # (- Korean translation from [@pierceh89]&#40;https://github.com/pierceh89&#41;.)

[//]: # (- Croatian translation from [@porx]&#40;https://github.com/porx&#41;.)

[//]: # (- Persian translation from [@Hameds]&#40;https://github.com/Hameds&#41;.)

[//]: # (- Ukrainian translation from [@osadchyi-s]&#40;https://github.com/osadchyi-s&#41;.)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Start using "changelog" over "change log" since it's the common usage.)

[//]: # (- Start versioning based on the current English version at 0.3.0 to help)

[//]: # (  translation authors keep things up-to-date.)

[//]: # (- Rewrite "What makes unicorns cry?" section.)

[//]: # (- Rewrite "Ignoring Deprecations" sub-section to clarify the ideal)

[//]: # (  scenario.)

[//]: # (- Improve "Commit log diffs" sub-section to further argument against)

[//]: # (  them.)

[//]: # (- Merge "Why can’t people just use a git log diff?" with "Commit log)

[//]: # (  diffs")

[//]: # (- Fix typos in Simplified Chinese and Traditional Chinese translations.)

[//]: # (- Fix typos in Brazilian Portuguese translation.)

[//]: # (- Fix typos in Turkish translation.)

[//]: # (- Fix typos in Czech translation.)

[//]: # (- Fix typos in Swedish translation.)

[//]: # (- Improve phrasing in French translation.)

[//]: # (- Fix phrasing and spelling in German translation.)

[//]: # ()
[//]: # (### Removed)

[//]: # ()
[//]: # (- Section about "changelog" vs "CHANGELOG".)

[//]: # ()
[//]: # (## [0.3.0] - 2015-12-03)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- RU translation from [@aishek]&#40;https://github.com/aishek&#41;.)

[//]: # (- pt-BR translation from [@tallesl]&#40;https://github.com/tallesl&#41;.)

[//]: # (- es-ES translation from [@ZeliosAriex]&#40;https://github.com/ZeliosAriex&#41;.)

[//]: # ()
[//]: # (## [0.2.0] - 2015-10-06)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Remove exclusionary mentions of "open source" since this project can)

[//]: # (  benefit both "open" and "closed" source projects equally.)

[//]: # ()
[//]: # (## [0.1.0] - 2015-10-06)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- Answer "Should you ever rewrite a change log?".)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Improve argument against commit logs.)

[//]: # (- Start following [SemVer]&#40;https://semver.org&#41; properly.)

[//]: # ()
[//]: # (## [0.0.8] - 2015-02-17)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Update year to match in every README example.)

[//]: # (- Reluctantly stop making fun of Brits only, since most of the world)

[//]: # (  writes dates in a strange way.)

[//]: # ()
[//]: # (### Fixed)

[//]: # ()
[//]: # (- Fix typos in recent README changes.)

[//]: # (- Update outdated unreleased diff link.)

[//]: # ()
[//]: # (## [0.0.7] - 2015-02-16)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- Link, and make it obvious that date format is ISO 8601.)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Clarified the section on "Is there a standard change log format?".)

[//]: # ()
[//]: # (### Fixed)

[//]: # ()
[//]: # (- Fix Markdown links to tag comparison URL with footnote-style links.)

[//]: # ()
[//]: # (## [0.0.6] - 2014-12-12)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- README section on "yanked" releases.)

[//]: # ()
[//]: # (## [0.0.5] - 2014-08-09)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- Markdown links to version tags on release headings.)

[//]: # (- Unreleased section to gather unreleased changes and encourage note)

[//]: # (  keeping prior to releases.)

[//]: # ()
[//]: # (## [0.0.4] - 2014-08-09)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- Better explanation of the difference between the file &#40;"CHANGELOG"&#41;)

[//]: # (  and its function "the change log".)

[//]: # ()
[//]: # (### Changed)

[//]: # ()
[//]: # (- Refer to a "change log" instead of a "CHANGELOG" throughout the site)

[//]: # (  to differentiate between the file and the purpose of the file — the)

[//]: # (  logging of changes.)

[//]: # ()
[//]: # (### Removed)

[//]: # ()
[//]: # (- Remove empty sections from CHANGELOG, they occupy too much space and)

[//]: # (  create too much noise in the file. People will have to assume that the)

[//]: # (  missing sections were intentionally left out because they contained no)

[//]: # (  notable changes.)

[//]: # ()
[//]: # (## [0.0.3] - 2014-08-09)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- "Why should I care?" section mentioning The Changelog podcast.)

[//]: # ()
[//]: # (## [0.0.2] - 2014-07-10)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- Explanation of the recommended reverse chronological release ordering.)

[//]: # ()
[//]: # (## [0.0.1] - 2014-05-31)

[//]: # ()
[//]: # (### Added)

[//]: # ()
[//]: # (- This CHANGELOG file to hopefully serve as an evolving example of a)

[//]: # (  standardized open source project CHANGELOG.)

[//]: # (- CNAME file to enable GitHub Pages custom domain)

[//]: # (- README now contains answers to common questions about CHANGELOGs)

[//]: # (- Good examples and basic guidelines, including proper date formatting.)

[//]: # (- Counter-examples: "What makes unicorns cry?")

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.0...HEAD
[1.0.0-alpha.13]: https://drive.google.com/file/d/1kPLO0eqnjbGketiqUKG-wmRpa4mU247i/view?usp=share_link
[1.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.3.0...v1.0.0
