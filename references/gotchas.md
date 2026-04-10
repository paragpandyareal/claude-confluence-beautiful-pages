# Gotchas, Limitations, and Hard-Won Lessons

These were all discovered through trial and error in real Confluence sessions. Every single one of these caused a problem at some point. Read all of them before building any page.

## ADF Structure Gotchas

**1. Markdown CANNOT produce coloured table headers.**
This is the number one gotcha. If you use `contentFormat: "markdown"`, your table headers will always be the default Confluence grey. You MUST use `contentFormat: "adf"` for any page that needs to look good. There is no workaround.

**2. `paragraph` cannot be nested inside `paragraph` in ADF.**
This causes silent failures where content just disappears. Each paragraph is a direct child of a block-level node (tableCell, panel, etc). If your helper function wraps content in a paragraph and then you wrap that in another paragraph, the inner content will vanish.

**3. `colspan`/`rowspan` in tableHeader attrs cause rendering issues.**
When Confluence returns ADF from a page created via markdown, it adds `"colspan": 1, "rowspan": 1` to every cell. When you push that back via ADF update, these can cause problems. Always strip them unless you are actually merging cells.

**4. Every status lozenge needs a unique `localId` or it won't render.**
Without it, the lozenge silently fails. Use meaningful prefixes like `"a01g"` (item A-01, green status) or random strings. Never reuse the same localId on the same page.

**5. Block nodes vs inline nodes.**
Status lozenges and text are inline nodes and must go inside `paragraph`. Panels, tables, headings, and rules are block-level and go directly in the document `content` array. Mixing these up causes silent failures.

**6. The `style` attribute on status lozenges must be an empty string `""`**, not omitted.
Some versions of the API reject status nodes without it.

## Payload Size Gotchas

**7. ADF payload size limit is roughly 30KB practical, 50KB absolute.**
A page with 15-20 requirement rows (each with 3 status lozenges, bold ref, grey clause text, description, and notes cell) will hit ~30KB. Beyond that, the API may accept the payload but Confluence Cloud may silently drop content from the rendered page. Always verify after update by fetching the page back.

**8. When updating pages, ALL content must be re-sent.**
The API replaces the entire body. It does not merge or patch. If you fetch a page, modify one table, and push it back, make sure you include everything else too. Anything not in the update payload will be deleted.

**9. Confluence Cloud may silently drop content if the ADF is too large.**
The API returns 200 OK but the page renders with missing sections. Always verify large pages after updating by fetching them back with `getConfluencePage`.

**10. Split into child pages proactively.**
Don't try to squeeze everything into one page. If you have 20+ rows with status lozenges, split into multiple child pages and a parent page with navigation.

## Table Gotchas

**11. Tables with 4+ columns need `layout: "wide"` or `layout: "full-width"`.**
The default layout makes 4-column tables very cramped, especially with status lozenges in cells.

**12. Table layout is set at the table level, not the row level.**
You set it in `table.attrs.layout`, not on individual rows or cells.

**13. `isNumberColumnEnabled: false` should always be set explicitly on every table.**
Otherwise Confluence may add an automatic row number column.

## Content Gotchas

**14. When you create a page in markdown then update it in ADF, the content format sticks to whatever you used last.**
If you create in markdown and then need to add colours, you must re-push the entire page content as ADF. You cannot "upgrade" from markdown to ADF for just the headers.

**15. Fetching a page in ADF format returns the full ADF with Confluence's own additions** (like `colspan`/`rowspan` on every cell, `ncsStepVersion`, etc).
If you want to transform and re-push, you need to clean these up or they may cause issues.

**16. Empty table cells need at least an empty paragraph.**
A tableCell with no content will cause a validation error. Always include at least `{"type": "paragraph", "content": [{"type": "text", "text": " "}]}` or `{"type": "paragraph"}`.

## PDF / Source Document Gotchas

**17. Image-based PDFs** (like scanned documents or some government PDFs) return empty strings from text extraction.
You need to rasterise them and read them visually. Always check if text extraction returns empty before assuming the PDF has no content.

**18. Large regulatory PDFs** (75+ pages) may need to be read in sections.
Don't try to extract the entire document at once as it may blow the context window.

## API Gotchas

**19. The `versionMessage` parameter is optional but highly recommended** for tracking what changed.
Without it, the version history just shows "edited" with no context.

**20. The `title` parameter on `updateConfluencePage` must always be provided.**
If you omit it, some API versions may clear the title.

**21. Creating pages with `contentFormat: "adf"` requires the body to be a valid JSON string** of the ADF document.
Not a JSON object, a JSON string. The tool handles serialization, but if you're building the ADF programmatically, make sure your output is a properly escaped JSON string.

**22. The cloudId, spaceId, and pageId are all required and must be correct.**
A wrong cloudId will give a 404. A wrong spaceId will create the page in the wrong space. Always confirm the values with the user.
