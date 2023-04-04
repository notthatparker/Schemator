chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSchema") {
        const scriptElements = document.querySelectorAll('script[type="application/ld+json"]');
        let schemaData = [];
        var jsonld = JSON.parse(document.querySelectorAll('script[type="application/ld+json"]').innerText);
        scriptElements.forEach((element) => {
          schemaData.push(element.textContent);
        });
        schemaData.join("\n\n");
    }
    return true;
  });