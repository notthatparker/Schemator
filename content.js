chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSchema") {
        const scriptElements = document.querySelectorAll('script[type="application/ld+json"]');
        let schemaData = [];
        scriptElements.forEach((element) => {
          schemaData.push(element.textContent);
        });
        schemaData.join("\n\n");
    }
    return true;
  });