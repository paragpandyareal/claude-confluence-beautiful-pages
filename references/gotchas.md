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

## Additional Gotchas (Node Types)

**23. `expand` nodes cannot go inside table cells.**
Confluence silently strips expand nodes from table cells. If you need collapsible content in a table, put the table inside the expand instead, or link to a child page with the details.

**24. `layoutSection` cannot be nested inside another `layoutSection`.**
You get one level of column layout per page section. If you need more complex layouts, use multiple `layoutSection` blocks stacked vertically, or use tables for grid layouts within a column.

**25. `taskList` and `decisionList` need unique `localId` values.**
Same rule as status lozenges. Without a unique localId, tasks and decisions may not render or may not be editable. Use meaningful prefixes like `"task-1"`, `"dec-1"`.

**26. `codeBlock` can only contain plain text nodes.**
No marks (bold, italic, colour, etc.) are allowed inside code blocks. If you add marks, they are silently stripped. The `language` attribute handles syntax highlighting automatically.

**27. `mediaSingle` with external URLs needs the image to be publicly accessible.**
If the image URL requires authentication or is behind a firewall, Confluence will show a broken image. Most Confluence images are uploaded attachments (type `"file"` with an attachment ID), not external URLs.

**28. `date` timestamps are in milliseconds, not seconds.**
Unix epoch multiplied by 1000. If you use seconds by mistake, the date will render as sometime in January 1970. A timestamp of `1719792000000` is correct for 1 July 2024. A timestamp of `1719792000` (without the last three zeros) would render as 20 January 1970.

**29. `link` marks only work on `text` nodes.**
You cannot make a status lozenge, emoji, or date into a clickable link. If you need a clickable status, put a linked text node next to the lozenge instead.

**30. Nested lists require a `listItem` containing another list.**
You cannot directly put a `bulletList` inside a `bulletList`. The correct nesting is: `bulletList` > `listItem` > (paragraph + `bulletList`). The paragraph with the parent item text comes first inside the listItem, then the nested list follows it.

**31. NEVER truncate content to fit the ADF size limit.**
If you have 64 items to display and your page only fits 8, create 8 child pages with 8 items each. Do NOT show 8 items and add a note saying "full dataset available elsewhere". The whole point of creating the page is to show ALL the content. Truncating defeats the purpose and makes the page useless. Each requirement table with status lozenges and verbatim text is roughly 2.5-3KB of ADF, so plan for ~8-10 per child page.
