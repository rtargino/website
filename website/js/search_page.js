import talksData from '../../static/autogenerated_files/json_files/talks.json' with { type: "json" };
import publicationsData from '../../static/autogenerated_files/json_files/publications.json' with { type: "json" };
import preprintsData from '../../static/autogenerated_files/json_files/preprints.json' with { type: "json" }; 

import { displayArticles } from './utils.js';

// Define types of publications with descriptive labels
const DATA_TYPES = {
    talks: "Talks",
    publications: "Publications",
    preprints: "Preprints"
};

// Cache frequently accessed DOM elements
const dropdownElement = document.getElementById('json-select');
const searchInputElement = document.getElementById('search-input');
const searchResultsElement = document.getElementById('search-results');

// Create variables to store the current data and data type
let currentData = publicationsData;
let currentDataType = 'publications';

// Populate dropdown menu with options for data types
function populateDropdownOptions() {
    for (const key in DATA_TYPES) {
        const optionElement = document.createElement('option');
        optionElement.value = key;
        optionElement.textContent = DATA_TYPES[key];
        dropdownElement.appendChild(optionElement);
    }
}

// Update current data based on the selected dropdown option and trigger search
function handleDropdownChange() {
    const selectedType = dropdownElement.value;

    switch (selectedType) {
        case 'talks':
            currentData = talksData;
            currentDataType = 'talks';
            break;
        case 'publications':
            currentData = publicationsData;
            currentDataType = 'publications';
            break;
        case 'preprints':
            currentData = preprintsData;
            currentDataType = 'preprints';
            break;
        default:
            currentData = publicationsData;
            currentDataType = 'publications';
    }

    // Perform a new search with the updated data
    updateSearchResults();
}

// Filter current data based on the search input and display results
function updateSearchResults() {
    const query = searchInputElement.value.toLowerCase();
    const filteredData = {};

    // Filter the data based on the search query
    for (const key in currentData) {
        const item = currentData[key];
        if (item.title.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query) ||
            item.journal.toLowerCase().includes(query) ||
            item.year.includes(query)) {
            filteredData[key] = item;
        }
    }

    // Display filtered results
    displayArticles(filteredData, searchResultsElement.id, currentDataType);
}

// Add event listeners for search input and dropdown change
function addEventListeners() {
    searchInputElement.addEventListener('input', updateSearchResults);
    dropdownElement.addEventListener('change', handleDropdownChange);
}

// Change the theme 
function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('theme', theme);
    localStorage.setItem('theme', theme); // Salva a preferência do usuário
}

// Detect user's system theme preference
function detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Inicialize theme based on user preference or system theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme'); // Verifica se o usuário já salvou uma preferência
    if (savedTheme) {
        applyTheme(savedTheme); // Usa a preferência salva
    } else {
        const systemTheme = detectSystemTheme(); // Usa o tema do sistema como padrão
        applyTheme(systemTheme);
    }
}

// Theme Toggle Script
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle-button');
    const root = document.documentElement;

    // Load saved theme preference
    initializeTheme();

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (root.getAttribute('theme') === "light") {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });
}

// Initialize the page with the default values and setup event listeners
function initializeSearchPage() {
    const params = new URLSearchParams(window.location.search);
    const dataType = params.get('type');

    populateDropdownOptions();
    addEventListeners();
    displayArticles(currentData, searchResultsElement.id, currentDataType);

    // Set the dropdown to the specified data type if provided in the URL
    if (dataType && Object.keys(DATA_TYPES).includes(dataType)) {
        dropdownElement.value = dataType;
        handleDropdownChange();
    }

    // Toggle theme
    toggleTheme();

    // Remove a tela de carregamento após todo o conteúdo ser carregado
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        // eait 0.3 second before removing the loading overlay
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 300);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeSearchPage);

document.getElementById('menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

// Seleciona todas as âncoras na navbar
const navLinks = document.querySelectorAll('a[href^="#"]');

// Adiciona um evento de clique em cada link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão de navegação da âncora
        
        const targetId = link.getAttribute('href'); // Pega o id da âncora
        const targetElement = document.querySelector(targetId); // Seleciona o elemento correspondente
        
        // Rola suavemente até o elemento
        targetElement.scrollIntoView({
            behavior: 'smooth', // Rola suavemente
            block: 'start' // Alinha o topo do elemento com o topo da tela
        });
    });
});