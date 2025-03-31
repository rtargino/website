/**
 * Fetches and processes CSV data, then populates the specified list or table.
 * @param {string} csvPath - The path to the CSV file.
 * @param {string} containerId - The ID of the container to populate.
 * @param {Function} populateFunction - The function to populate the data.
 */
export async function renderCsv(csvPath, containerId, populateFunction) {
    try {
        const response = await fetch(csvPath);
        if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);

        const csvData = await response.text();
        populateFunction(csvData, containerId);
    } catch (error) {
        console.error(`Error loading CSV from ${csvPath}:`, error);
    }
}

/**
 * Populates an HTML table with the data from the CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} tableId - The ID of the HTML table element to display the data.
 */
export function populateTable(csvText, tableId) {
    const rows = csvText.split('\n');
    const tableElement = document.getElementById(tableId);

    if (!tableElement) {
        console.error(`Element with id '${tableId}' not found.`);
        return;
    }

    // Clear the table content before populating it with new data
    tableElement.innerHTML = '';

    // Process each row in the CSV data
    rows.forEach((row, rowIndex) => {
        const newRow = tableElement.insertRow(-1); // Insert a new row at the end of the table
        let cells = [];

        // Split the row by commas
        cells = row.split(',');

        // Add each cell to the row (th for headers, td for data cells)
        cells.forEach(cellText => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElement.textContent = cellText.trim();
            newRow.appendChild(cellElement);
        });
    });
}

// /**
//  * Populates an education section with the data from the CSV file.
//  * @param {string} csvText - The CSV data as a string.
//  * @param {string} divId - The ID of the div to populate.
//  */
// export function populateEducation(csvText, divId) {
//     const lines = csvText.split('\n').slice(1).filter(line => line.trim() !== '');
//     const divElement = document.getElementById(divId);
//     if (!divElement) {
//         console.error(`Element with id '${divId}' not found.`);
//         return;
//     }

//     divElement.innerHTML = ''; // Clear previous content

//     lines.forEach(line => {
//         const [course, institution, startYear, year, location] = line.split(',');

//         if (course && institution && year) {
//             divElement.appendChild(createEducationEntry(course, institution, year));
//         }
//     });
// }

/**
 * Populates an education section with the data from the CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} ulId - The ID of the UL to populate.
 */
export function populateEducation(csvText, ulId) {
    const lines = csvText.split('\n').slice(1).filter(line => line.trim() !== ''); // Ignora a primeira linha (cabeçalho) e linhas vazias
    const ulElement = document.getElementById(ulId);
    
    if (!ulElement) {
        console.error(`Element with id '${ulId}' not found.`);
        return;
    }

    ulElement.innerHTML = ''; // Limpa o conteúdo anterior da lista

    lines.forEach(line => {
        const [course, institution, startYear, year] = line.split(',').map(item => item.trim()); // Remove espaços em branco

        if (course && institution && startYear && year) {
            const liElement = document.createElement('li'); // Cria um novo elemento <li>
            liElement.classList.add('education-item'); // Adiciona a classe 'collection-item' ao elemento

            // Cria o primeiro parágrafo para curso e ano
            const firstLine = document.createElement('p');
            firstLine.textContent = `${course}, ${startYear} - ${year}`;

            // Cria o segundo parágrafo para instituição
            const secondLine = document.createElement('p');
            secondLine.classList.add('grey-text');
            secondLine.classList.add('education-institution');
            secondLine.textContent = institution;

            // Adiciona os parágrafos dentro do li
            liElement.appendChild(firstLine);
            liElement.appendChild(secondLine);

            // Adiciona o li à ul
            ulElement.appendChild(liElement);
        }
    });
}


/**
 * Creates a div for a single education entry.
 * @param {string} course - The course name.
 * @param {string} institution - The institution name.
 * @param {string} year - The year of completion.
 * @returns {HTMLElement} - A div element containing the education entry.
 */
function createEducationEntry(course, institution, year) {
    const entryDiv = document.createElement('div');
    entryDiv.innerHTML = `
        <p style="font-weight: bold;">${course}, ${year}</p>
        <p>${institution}</p>
    `;
    return entryDiv;
}


/**
 * Populates an experience list with data from a CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} listId - The ID of the list element to populate.
 */
export function populateExperience(csvText, listId) {
    const lines = csvText.split('\n').slice(1).filter(line => line.trim() !== '');
    const listElement = document.getElementById(listId);

    if (!listElement) {
        console.error(`Element with id '${listId}' not found.`);
        return;
    }

    // Sort the data by date in descending order
    const sortedLines = lines.sort((a, b) => new Date(b.split('","')[4].split(",")[0]) - new Date(a.split('","')[4].split(",")[0]));

    listElement.innerHTML = ''; // Clear previous content

    sortedLines.forEach(line => {
        const [title, company, companyURL, location, startDate, endDate] = parseCsvRow(line);
        listElement.appendChild(createExperienceItem(title, company, companyURL, location, startDate, endDate));
    });
}

/**
 * Parses a CSV row taking into account potential quotes and commas within fields.
 * @param {string} row - The CSV row as a string.
 * @returns {string[]} - An array of cell values.
 */
function parseCsvRow(row) {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    return row.match(regex).map(cell => cell.replace(/(^"|"$)/g, ''));
}

/**
 * Creates an HTML list item for a single experience entry.
 * @param {string} title - The job title.
 * @param {string} company - The company name.
 * @param {string} companyURL - The URL of the company.
 * @param {string} location - The location of the job.
 * @param {string} startDate - The start date of the job.
 * @param {string} endDate - The end date of the job (optional).
 * @returns {HTMLElement} - An HTML list item representing the experience entry.
 */
function createExperienceItem(title, company, companyURL, location, startDate, endDate) {
    const listItem = document.createElement('li');

    //  If endDate is not provided or is a invalid date, consider the job as current
    const dateFormatted = `${formatDate(startDate)} – ${formatDate(endDate) !== 'Invalid Date' ? formatDate(endDate) : 'Present'}`;

    // Add the class 'filled' if dateFormatted ends with 'Present'
    if (dateFormatted.endsWith('Present')) {
        listItem.classList.add('filled');
    }

    listItem.innerHTML = `
        <p style="font-weight: bold;">${title}</p>
        <p><a href="${companyURL}" target="_blank">${company}</a></p>
        <p class="grey-text">${dateFormatted} • ${location}</p>
    `;

    return listItem;
}

/**
 * Formats a date string into a human-readable format (e.g., Sep 2022).
 * @param {string} dateStr - The date string (e.g., "2022-09-01").
 * @returns {string} - The formatted date.
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

/**
 * Generates a string of HTML representing a publication.
 * @param {object} publication - The publication object containing its details.
 * @param {HTMLElement} publicationCard - The publication card element to append the HTML to
 * @param {string} publicationType - The type of the publication
 * @returns {string} - The HTML string representing the publication card.
 */
function generatePublicationHtml(publication, publicationCard, publicationType) {
    // Create a title element with an onclick event to open the modal in the publication card
    const titleElement = document.createElement('h3');
    titleElement.classList.add('publication-title');

    titleElement.textContent = publication.title;

    titleElement.onclick = function() {
        showArticleDetails(publication, publicationType);
    };

    // Create a paragraph element with the publication details
    const publicationDetails = document.createElement('p');
    const publicationVolume = publication.volume ? `Volume ${publication.volume}` : '';

    var publishedInfo = "";
    publishedInfo = [publication.journal, `(${publication.year})`].filter(Boolean).join(' ');

    publicationDetails.innerHTML = `
        <p class="grey-text no-margin">${publication.author}</p>
        <p class="no-margin">${publishedInfo}</p>
        <a href="${publication.doi || publication.url}" target="_blank" class="doc-link">${publication.doi ? 'DOI' : 'PDF'}</a>
        <a class="cite-link">CITE</a>
    `;

    const citeLink = publicationDetails.querySelector('.cite-link');

    citeLink.onclick = function(event) {
        event.stopPropagation();
        showArticleCite(publication, publicationType);
    };

    // Append the title and details to the publication card
    publicationCard.appendChild(titleElement);
    publicationCard.appendChild(publicationDetails);

    return publicationCard;
}

/**
 * Generates a string of HTML representing a talk.
 * @param {object} talk - The talk object containing its details.
 * @param {HTMLElement} talkCard - The talk card element to append the HTML to
 * @returns {string} - The HTML string representing the talk card.
 */
function generateTalkHtml(talk, talkCard) {
    // Create a title element with an onclick event to open the modal in the talk card
    const titleElement = document.createElement('h3');
    titleElement.classList.add('publication-title');
    
    titleElement.textContent = talk.title;

    titleElement.onclick = function() {
        showArticleDetails(talk, "talks");
    }

    // Create a paragraph element with the talk details
    const talkDetails = document.createElement('p');

    // Truncate abstract if too long
    const talkAbstract = talk.abstract ? talk.abstract.substring(0, 200) + '...' : ''; 

    // Format full date if provided, else just year
    var formattedDate = 'Unknown Date';
    if (talk.year && talk.month && talk.day) {
        formattedDate = new Date(`${talk.year}-${talk.month}-${talk.day}`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    else if (talk.year && talk.month) {
        formattedDate = new Date(`${talk.year}-${talk.month}`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
    else if (talk.year) {
        formattedDate = new Date(`${talk.year}`).toLocaleDateString('en-US', { year: 'numeric' });
    }
    
    // talkDetails.innerHTML = `
    //     ${talkAbstract}<br>
    //     ${talk.year} - ${talk.journal}<br>
    //     <a href="${talk.url}" target="_blank" class="doc-link">PDF</a>
    //     <a class="cite-link">CITE</a>
    // `;

    talkDetails.innerHTML = `
        <p class="grey-text no-margin">${formattedDate} • ${talk.journal}</p>
        <a href="${talk.url}" target="_blank" class="doc-link">PDF</a>
        <a class="cite-link">CITE</a>
    `;

    const citeLink = talkDetails.querySelector('.cite-link');
    citeLink.onclick = function(event) {
        event.stopPropagation();
        showArticleCite(talk, "talks");
    };

    // Append the title and details to the talk card
    talkCard.appendChild(titleElement);
    talkCard.appendChild(talkDetails);

    return talkCard;
}

/**
 * Adds a card representing an article to a specified container.
 * @param {object} article - The article object containing its details.
 * @param {HTMLElement} container - The container element where the article card will be appended.
 * @param {string} articleType - The type of the article ('publications' or 'talks').
 */
function appendArticleCard(article, container, articleType) {
    let articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    // Select the appropriate card template based on the article type
    switch (articleType) {
        case 'talks':
            articleCard = generateTalkHtml(article, articleCard);
            break;
        default:
            articleCard = generatePublicationHtml(article, articleCard, articleType);
            break;
    }

    container.appendChild(articleCard);
}

/**
 * Opens a modal window with the details of an article.
 * @param {object} article - The article object containing its details.
 * @param {string} articleType - The type of the article.
 * @param {object} content - The content to display in the modal window.
 */
function openDetailModal(article, articleType, content) {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        modal.style.display = event.target === modal ? 'none' : modal.style.display;
    };

    // If no content is provided, break out of the function
    if (!content) return;

    // Set the content and display the modal 
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Close the modal if the user clicks the close button
    const closeBtn = document.querySelector('#closeModal');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    const citeLink = modalContent.querySelector('.cite-link');
    citeLink.onclick = function(event) {
        event.stopPropagation();
        showArticleCite(article, articleType);
    };
}

/**
 * Displays the details of an article in a modal window.
 * @param {object} article - The article object containing its details.
 * @param {string} articleType - The type of the article.
 */
function showArticleDetails(article, articleType) {
    const content = `
      <h1>${article.title}</h1>
      <p><strong>(${article.year})</strong> ${article.author}</p>
      <h3>Abstract</h3>
      <p>${article.abstract || 'No abstract available.'}</p>
      <p>${article.journal ? `${article.journal}, Volume ${article.volume}` : ''}</p>
      <p><a href="${article.doi || article.url}" target="_blank" class="doc-link">${article.doi ? 'DOI' : 'PDF'}</a></p>
      <a class="cite-link">CITE</a>
    `;
    openDetailModal(article, articleType, content);
}

/**
 * Opens a modal window with the citation details of an article.
 * @param {string} content - The content to display in the modal window.
 */
function openCiteModal(content) {
    const modal = document.getElementById('citeModal');
    const modalContent = document.getElementById('citeModalContent');

    modalContent.innerHTML = content;
    modal.style.display = 'block';

    window.onclick = function(event) {
        modal.style.display = event.target === modal ? 'none' : modal.style.display;
        
        // If a detail modal is open, listen for clicks to close it
        if (document.getElementById('articleModal').style.display === 'block') {
            openDetailModal();
        }
    };
    
    const closeBtn = document.querySelector('#closeCiteModal');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
}

/**
 * Displays the citation details of an article in a modal window.
 * @param {object} article - The article object containing its details.
 * @param {string} articleType - The type of the article.
 */
function showArticleCite(article, articleType) {
    // Get the citation text in static/autogenerated_files/individual_bib_files/publications/ARTICLE_ID.bib
    fetch(`./static/autogenerated_files/individual_bib_files/${articleType}/${article.ID}.bib`)
        .then(response => response.text())
        .then(text => {
            const content = `
                <h1>${article.title}</h1>
                <pre>${text}</pre>
            `;
            openCiteModal(content);
        });
}



/**
 * Displays a list of articles (e.g., publications or talks) within a specified container.
 * @param {object} articlesData - The data object containing articles to display.
 * @param {string} containerId - The ID of the container element where the articles will be rendered.
 * @param {string} articleType - The type of articles to display (e.g., 'publications', 'talks').
 * @param {number} [limit=Infinity] - The maximum number of articles to display (default is unlimited).
 */
export function displayArticles(articlesData, containerId, articleType, limit = Infinity) {
    const containerElement = document.getElementById(containerId);
    
    // Clear any existing content in the container
    containerElement.innerHTML = '';

    // Loop through the articles and append them to the container, respecting the limit
    let articleCount = 0;
    for (const articleKey in articlesData) {
        if (articleCount >= limit) break;
        
        appendArticleCard(articlesData[articleKey], containerElement, articleType);
        articleCount++;
    }
}
