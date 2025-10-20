// Web Worker để xử lý tìm kiếm văn bản
self.onmessage = function(e) {
    const { query, content } = e.data;
    const result = searchRelevantContent(query, content);
    self.postMessage(result);
};

function searchRelevantContent(query, content) {
    const sections = content.split('\n\n');
    const relevantSections = [];
    const keywords = query.toLowerCase().split();

    for (const section of sections) {
        const sectionLower = section.toLowerCase();
        if (keywords.some(keyword => sectionLower.includes(keyword))) {
            relevantSections.push(section);
        }
    }

    return relevantSections.slice(0, 5).join('\n\n');
}
