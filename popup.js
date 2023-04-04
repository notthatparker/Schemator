document.getElementById("mainTab").addEventListener("click", () => {
    showTabContent("main");
  });
  
  document.getElementById("searchTab").addEventListener("click", () => {
    showTabContent("search");
  });
  
  function showTabContent(tabId) {
    let tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
  }
  
  document.getElementById("fetchSchema").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            console.log("At this point");
            const scriptElements =  document.querySelectorAll('script[type="application/ld+json"]');
            var jsonld = JSON.parse(document.querySelectorAll('script[type="application/ld+json"]').innerText);
            let schemaData = [];
            scriptElements.forEach((element) => {
              schemaData.push(element.textContent);
            });
            return schemaData.join("\n\n"),jsonld;
          },
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          document.getElementById("schemaOutput").value = results[0].result;
        }
      );
    });
  });
  
  document.getElementById("copySchema").addEventListener("click", async () => {
    const schemaOutput = document.getElementById("schemaOutput");
    if (schemaOutput != null){
    try {
      await navigator.clipboard.writeText(schemaOutput.value);
      alert("Schema copied to clipboard!");
    } catch (error) {
      console.error("Error copying schema to clipboard:", error);
      alert("Failed to copy schema to clipboard.");
    }}
  });
  
  document.getElementById("searchBtn").addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value;
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
    fetch(`https://schema.org/docs/search_results.html?q==${searchTerm}`)
    .then((response) => response.json())
      .then((data) => {
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = "";
        if (data && data.length > 0) {
          data.forEach((item) => {
            searchResults.innerHTML += `
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            `;
          });
        } else {
          searchResults.innerText = "No results found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching schema.org term:", error);
      });
  });