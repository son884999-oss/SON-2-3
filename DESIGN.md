# DESIGN.md — Product UI Design Rules

This file defines the visual and UX rules for this product.
Treat these rules as constraints, not suggestions.

## 1. Core principle

The interface must feel like a deliberately designed real product, not a generic AI-generated SaaS template.

Prioritize:
1. usability
2. information hierarchy
3. readability
4. product-specific workflows
5. visual restraint

Decoration is secondary.

Before adding any UI element, ask:
- What user problem does this solve?
- Does this information need its own container?
- Is the same information already visible elsewhere?
- Would removing this element make the page harder to use?

If removing it causes no meaningful loss, remove it.

## 2. Avoid generic AI/SaaS aesthetics

Do not default to:
- gradient hero backgrounds
- purple/blue AI gradients
- glassmorphism
- glowing borders
- excessive shadows
- huge marketing headlines
- decorative blobs
- meaningless illustrations
- floating decorative icons
- excessive pills/badges
- cards for every piece of information
- repetitive three-column feature grids
- icon + heading + paragraph repeated across a page
- oversized empty spacing used only to look "premium"
- unnecessary animations
- generic AI sparkle icons
- generic copy such as "Unlock insights", "Supercharge", "AI-powered", or "Smarter decisions"

Do not make the interface futuristic merely because AI is involved.

## 3. Containers and cards

Cards are not the default layout primitive.

Use a card only when content:
- is independently actionable,
- needs strong visual separation,
- represents a distinct object,
- or has a meaningful interaction boundary.

Do not create separate cards for:
- single statistics,
- section titles,
- short explanations,
- every chart,
- every table,
- every metric.

Prefer, in order:
1. typography hierarchy
2. whitespace
3. dividers
4. alignment
5. subtle background changes
6. containers/cards only when necessary

Avoid deeply nested cards.

## 4. Layout

Use a clear content hierarchy rather than making every section visually equal.

Desktop content should generally stay within a sensible maximum width appropriate to the product.

Important content may receive more space than secondary content.
Perfect symmetry is not required.

Prefer layouts that reflect the importance and relationship of information.

Avoid repeating identical blocks merely to fill a grid.

## 5. Spacing

Use a consistent spacing scale.

Suggested base scale:
- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px

Dense information interfaces may use tighter spacing.

Do not add large vertical gaps without a structural reason.

Related elements should visually group together.
Unrelated sections should have clearly stronger separation.

## 6. Typography

Typography should communicate hierarchy before containers do.

Prefer a neutral, highly readable sans-serif font appropriate to the product and locale.

Use:
- restrained heading sizes
- strong numeric readability
- tabular numerals for financial/data-heavy values when available
- muted secondary text
- clear labels

Avoid:
- extremely large hero typography
- excessive bold text
- using font size alone to establish hierarchy
- multiple competing font styles

Numbers and primary values should often receive stronger visual priority than decorative headings in data-heavy products.

## 7. Color

Use a restrained palette.

Prefer:
- neutral page backgrounds
- near-black primary text
- neutral gray secondary text
- subtle borders
- one primary accent color

Semantic colors must have meaning and should not be decorative.

Do not use gradients unless the product has a specific functional or brand reason.

Do not create a rainbow of category colors without a strong information-design reason.

## 8. Borders, radius, and shadows

Prefer borders and spacing over shadows.

Border radius should be restrained and consistent.
A typical interface radius range is approximately 6–10px unless the existing product system defines otherwise.

Avoid:
- rounded-2xl everywhere
- pill-shaped containers without semantic reason
- heavy drop shadows
- multiple shadow layers
- glowing effects

## 9. Data presentation

For data-heavy screens, favor comparison and context.

Bad:

    PER
    12.4x

Better:

    PER        12.4x
    Industry   18.1x
    Difference -31%

Whenever possible, present:
value → comparison/context → interpretation.

Use tables when users need to scan or compare multiple related values.
Do not replace useful tables with grids of metric cards simply for visual appearance.

Charts must answer a question.
Do not add charts solely to make dashboards look sophisticated.

Every chart should have:
- a clear purpose
- readable labels
- sensible units
- appropriate comparison context
- minimal visual noise

## 10. Interaction

Interactive elements must look interactive.
Static information should not unnecessarily resemble buttons.

Avoid excessive hover movement, scaling, glowing, or bouncing.

Animation should communicate:
- state change
- hierarchy
- spatial relationship
- progress

If animation does none of these, remove it.

## 11. Copy

Product copy should be direct and specific.

Prefer:
"Compare valuation"
"Revenue growth slowed in the last 3 quarters"
"Operating margin is above the industry median"

Avoid:
"Unlock powerful insights"
"Transform your journey"
"Experience smarter analysis"
"AI-powered intelligence at your fingertips"

Do not mention AI unless knowing that AI is involved is useful to the user at that moment.

## 12. Responsive design

Do not treat mobile as desktop stacked vertically.

On smaller screens:
- prioritize the most important information
- reduce simultaneous comparisons when necessary
- allow appropriate horizontal scrolling for data tables
- preserve readable numeric values
- simplify secondary controls
- keep primary actions accessible

Do not hide critical information merely to achieve visual minimalism.

## 13. Reuse

Before creating a new component:
1. search for an existing component,
2. determine whether it can be reused,
3. extend it if the variation is legitimate,
4. create a new component only when its responsibility is genuinely different.

Do not create multiple near-identical components with slightly different styling.

## 14. Anti-pattern review

Before finishing any UI task, explicitly inspect the result for:

- too many cards
- too many rounded rectangles
- unnecessary gradients
- unnecessary shadows
- excessive badges
- excessive icons
- repetitive grids
- generic SaaS landing-page structure
- oversized headings
- weak information hierarchy
- excessive whitespace
- decorative UI with no user value
- duplicated information
- inconsistent spacing
- inconsistent radius
- inconsistent typography
- controls that look different despite doing the same job

Fix these issues before considering the UI complete.

## 15. Final test

A screen should not be considered finished merely because it looks polished.

Ask:
- Can the user immediately identify the primary information?
- Is important information visually stronger than secondary information?
- Is anything present only because it "looks modern"?
- Could any card be replaced by spacing or a divider?
- Does the page resemble a generic template more than this specific product?
- Does the interface help the user complete the actual task faster?

If the interface feels like a generic dashboard or SaaS template, revise it.
